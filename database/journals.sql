-- Create journals table
CREATE TABLE IF NOT EXISTS journals (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  university TEXT NOT NULL,
  p_issn TEXT NOT NULL,
  e_issn TEXT NOT NULL,
  cover TEXT,
  badges JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_journals_created_at ON journals(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE journals ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access to journals" ON journals
  FOR SELECT USING (true);

-- Create policy for authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users to manage journals" ON journals
  FOR ALL USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_journals_updated_at 
  BEFORE UPDATE ON journals 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO journals (title, university, p_issn, e_issn, cover, badges) VALUES
(
  'JURNAL TEKNOLOGI DAN MANAJEMEN INDUSTRI TERAPAN',
  'Universitas Pancasila Jakarta',
  '1234-5678',
  '1234-5678',
  '/cover-jurnal.png',
  '[
    {"label": "S1 Accredited", "color": "bg-yellow-200 text-yellow-800"},
    {"label": "Garuda Indexed", "color": "bg-red-200 text-red-800"}
  ]'::jsonb
),
(
  'JURNAL INOVASI TEKNOLOGI PERTANIAN',
  'Institut Pertanian Bogor',
  '2345-6789',
  '2345-6789',
  '/cover-jurnal.png',
  '[
    {"label": "Sinta Indexed", "color": "bg-blue-200 text-blue-800"},
    {"label": "Scopus Indexed", "color": "bg-green-200 text-green-800"}
  ]'::jsonb
),
(
  'JURNAL MANAJEMEN BISNIS DAN TEKNOLOGI',
  'Universitas Indonesia',
  '3456-7890',
  '3456-7890',
  '/cover-jurnal.png',
  '[
    {"label": "S1 Accredited", "color": "bg-yellow-200 text-yellow-800"},
    {"label": "Sinta Indexed", "color": "bg-blue-200 text-blue-800"}
  ]'::jsonb
); 