CREATE TABLE public.rate_limit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX rate_limit_events_key_created_idx
  ON public.rate_limit_events (key, created_at);

-- Only the service role touches this table (it bypasses RLS). No policies
-- are added for anon/authenticated, so both are denied by default.
ALTER TABLE public.rate_limit_events ENABLE ROW LEVEL SECURITY;

GRANT ALL ON public.rate_limit_events TO service_role;

-- Tighten contact_clicks against oversized junk payloads sent directly to
-- the Supabase REST API (bypassing the app's own UI entirely).
ALTER TABLE public.contact_clicks
  ADD CONSTRAINT contact_clicks_location_len CHECK (location IS NULL OR length(location) <= 100),
  ADD CONSTRAINT contact_clicks_path_len CHECK (path IS NULL OR length(path) <= 300),
  ADD CONSTRAINT contact_clicks_device_len CHECK (device IS NULL OR length(device) <= 40);
