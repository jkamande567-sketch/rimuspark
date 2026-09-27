import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { getAnalyticsSummary, type AnalyticsSummary } from "@/lib/analytics.functions";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics | Rimu Creatives" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AnalyticsPage,
});

const CHANNEL_LABELS: Record<string, string> = {
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  email: "Email",
  phone: "Phone",
  facebook: "Facebook",
  x: "X",
  tiktok: "TikTok",
};

function toDateInputValue(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function presetRange(days: number) {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - (days - 1));
  return { startDate: toDateInputValue(start), endDate: toDateInputValue(end) };
}

// ---- Auth gate -------------------------------------------------------

function useSupabaseSession() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return session;
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) setError(signInError.message);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5 border border-border p-8">
        <div>
          <h1 className="font-display text-xl font-bold">Rimu Creatives — Analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to view internal analytics.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}

// ---- Dashboard ---------------------------------------------------------

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-display text-3xl font-bold">{value.toLocaleString()}</p>
      </CardContent>
    </Card>
  );
}

function BreakdownTable({
  title,
  rows,
  labelHeader,
}: {
  title: string;
  rows: { label: string; count: number }[];
  labelHeader: string;
}) {
  const total = rows.reduce((sum, row) => sum + row.count, 0);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">No clicks in this range.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{labelHeader}</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">Share</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.label}>
                  <TableCell className="font-medium">{row.label}</TableCell>
                  <TableCell className="text-right">{row.count}</TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {total ? Math.round((row.count / total) * 100) : 0}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  const fetchSummary = useServerFn(getAnalyticsSummary);
  const preset7 = presetRange(7);
  const [startDate, setStartDate] = useState(preset7.startDate);
  const [endDate, setEndDate] = useState(preset7.endDate);

  const { data, isLoading, error } = useQuery({
    queryKey: ["analytics-summary", startDate, endDate],
    queryFn: () => fetchSummary({ data: { startDate, endDate } }),
  });

  const summary: AnalyticsSummary | undefined = data;

  const channelChartData = useMemo(
    () =>
      (summary?.byChannel ?? []).map((c) => ({
        name: CHANNEL_LABELS[c.channel] ?? c.channel,
        clicks: c.count,
      })),
    [summary],
  );

  function applyPreset(days: number) {
    const range = presetRange(days);
    setStartDate(range.startDate);
    setEndDate(range.endDate);
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold">Contact analytics</h1>
            <p className="text-sm text-muted-foreground">
              Instagram, WhatsApp, email, phone, and social click activity.
            </p>
          </div>
          <Button variant="outline" onClick={() => supabase.auth.signOut()}>
            Sign out
          </Button>
        </div>

        <Card>
          <CardContent className="flex flex-wrap items-end gap-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="start">Start date</Label>
              <Input
                id="start"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                max={endDate}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end">End date</Label>
              <Input
                id="end"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
                max={toDateInputValue(new Date())}
              />
            </div>
            <div className="flex flex-wrap gap-2 pb-0.5">
              <Button type="button" variant="secondary" size="sm" onClick={() => applyPreset(7)}>
                Last 7 days
              </Button>
              <Button type="button" variant="secondary" size="sm" onClick={() => applyPreset(30)}>
                Last 30 days
              </Button>
              <Button type="button" variant="secondary" size="sm" onClick={() => applyPreset(90)}>
                Last 90 days
              </Button>
            </div>
          </CardContent>
        </Card>

        {error && (
          <p className="text-sm text-destructive">Couldn't load analytics data. Try refreshing.</p>
        )}

        {isLoading || !summary ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <SummaryCard label="Total clicks" value={summary.totalClicks} />
              {["instagram", "whatsapp", "email", "phone"].map((channel) => (
                <SummaryCard
                  key={channel}
                  label={CHANNEL_LABELS[channel] ?? channel}
                  value={summary.byChannel.find((c) => c.channel === channel)?.count ?? 0}
                />
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Clicks over time</CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={summary.byDay}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="date" fontSize={12} tickLine={false} />
                    <YAxis allowDecimals={false} fontSize={12} tickLine={false} width={30} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="count"
                      name="Clicks"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Clicks by channel</CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={channelChartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="name" fontSize={12} tickLine={false} />
                    <YAxis allowDecimals={false} fontSize={12} tickLine={false} width={30} />
                    <Tooltip />
                    <Bar dataKey="clicks" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 lg:grid-cols-2">
              <BreakdownTable
                title="By page location"
                labelHeader="Location"
                rows={summary.byLocation.map((r) => ({ label: r.location, count: r.count }))}
              />
              <BreakdownTable
                title="By device"
                labelHeader="Device"
                rows={summary.byDevice.map((r) => ({ label: r.device, count: r.count }))}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function AnalyticsPage() {
  const session = useSupabaseSession();

  if (session === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (!session) return <LoginForm />;

  return <Dashboard />;
}
