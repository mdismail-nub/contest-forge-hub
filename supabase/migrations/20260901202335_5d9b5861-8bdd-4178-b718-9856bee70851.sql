CREATE POLICY "Admins can upload contest banners"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'contest-banners' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contest banners"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'contest-banners' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete contest banners"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'contest-banners' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can read contest banners"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'contest-banners' AND public.has_role(auth.uid(), 'admin'));