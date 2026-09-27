import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const inputSchema = z.object({
  // Inclusive, in YYYY-MM-DD form, interpreted in UTC.
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export type ChannelCount = { channel: string; count: number };
export type DayCount = { date: string; count: number };
export type LocationCount = { location: string; count: number };
export type DeviceCount = { device: string; count: number };

export type AnalyticsSummary = {
  totalClicks: number;
  byChannel: ChannelCount[];
  byDay: DayCount[];
  byLocation: LocationCount[];
  byDevice: DeviceCount[];
  byChannelAndDevice: { channel: string; device: string; count: number }[];
};

function validate(data: unknown) {
  return inputSchema.parse(data);
}

export const getAnalyticsSummary = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(validate)
  .handler(async ({ data }): Promise<AnalyticsSummary> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const start = new Date(`${data.startDate}T00:00:00.000Z`);
    const end = new Date(`${data.endDate}T00:00:00.000Z`);
    end.setUTCDate(end.getUTCDate() + 1); // make endDate inclusive

    const { data: rows, error } = await supabaseAdmin
      .from("contact_clicks")
      .select("channel, location, device, created_at")
      .gte("created_at", start.toISOString())
      .lt("created_at", end.toISOString())
      .order("created_at", { ascending: true })
      .limit(50000);

    if (error) {
      console.error("analytics query failed", error);
      throw new Error("Couldn't load analytics data.");
    }

    const byChannel = new Map<string, number>();
    const byDay = new Map<string, number>();
    const byLocation = new Map<string, number>();
    const byDevice = new Map<string, number>();
    const byChannelAndDevice = new Map<string, number>();

    for (const row of rows ?? []) {
      const channel = row.channel ?? "unknown";
      const location = row.location ?? "unspecified";
      const device = row.device ?? "unknown";
      const day = String(row.created_at).slice(0, 10);

      byChannel.set(channel, (byChannel.get(channel) ?? 0) + 1);
      byDay.set(day, (byDay.get(day) ?? 0) + 1);
      byLocation.set(location, (byLocation.get(location) ?? 0) + 1);
      byDevice.set(device, (byDevice.get(device) ?? 0) + 1);
      const key = `${channel}::${device}`;
      byChannelAndDevice.set(key, (byChannelAndDevice.get(key) ?? 0) + 1);
    }

    return {
      totalClicks: rows?.length ?? 0,
      byChannel: [...byChannel.entries()]
        .map(([channel, count]) => ({ channel, count }))
        .sort((a, b) => b.count - a.count),
      byDay: [...byDay.entries()]
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date)),
      byLocation: [...byLocation.entries()]
        .map(([location, count]) => ({ location, count }))
        .sort((a, b) => b.count - a.count),
      byDevice: [...byDevice.entries()]
        .map(([device, count]) => ({ device, count }))
        .sort((a, b) => b.count - a.count),
      byChannelAndDevice: [...byChannelAndDevice.entries()].map(([key, count]) => {
        const [channel = "unknown", device = "unknown"] = key.split("::");
        return { channel, device, count };
      }),
    };
  });
