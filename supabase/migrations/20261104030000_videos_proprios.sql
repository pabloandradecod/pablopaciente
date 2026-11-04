-- Vídeos gravados pelo Dr. Pablo no celular: limite de 50 MB e formatos comuns de celular.
update storage.buckets
   set file_size_limit = 52428800,
       allowed_mime_types = array['video/mp4', 'video/webm', 'video/quicktime', 'video/3gpp', 'video/x-m4v']
 where id = 'exercicios';
