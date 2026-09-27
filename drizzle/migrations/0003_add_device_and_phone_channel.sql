ALTER TABLE public.contact_clicks ADD COLUMN IF NOT EXISTS device text;

DROP POLICY IF EXISTS "Anyone can log a contact click" ON public.contact_clicks;

CREATE POLICY "Anyone can log a contact click"
ON public.contact_clicks
FOR INSERT
TO anon, authenticated
WITH CHECK (channel IN ('instagram', 'whatsapp', 'email', 'phone', 'facebook', 'x', 'tiktok'));
