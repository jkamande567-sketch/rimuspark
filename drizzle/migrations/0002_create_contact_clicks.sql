CREATE TABLE public.contact_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  channel text NOT NULL,
  location text,
  path text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.contact_clicks TO anon;
GRANT INSERT ON public.contact_clicks TO authenticated;
GRANT ALL ON public.contact_clicks TO service_role;

ALTER TABLE public.contact_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log a contact click"
ON public.contact_clicks
FOR INSERT
TO anon, authenticated
WITH CHECK (channel IN ('instagram','whatsapp','email','facebook','x','tiktok'));