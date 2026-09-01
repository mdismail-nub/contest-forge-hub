-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- updated_at helper
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Contests
CREATE TABLE public.contests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  platform text NOT NULL DEFAULT 'Competitive Coders',
  difficulty text NOT NULL DEFAULT 'Intermediate',
  description text,
  prize text,
  tags text[] NOT NULL DEFAULT '{}',
  participants integer NOT NULL DEFAULT 0,
  banner_url text,
  external_url text,
  starts_at timestamptz NOT NULL DEFAULT now(),
  ends_at timestamptz,
  status text NOT NULL DEFAULT 'upcoming',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.contests TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contests TO authenticated;
GRANT ALL ON public.contests TO service_role;
ALTER TABLE public.contests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Contests are publicly viewable"
ON public.contests FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins can insert contests"
ON public.contests FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contests"
ON public.contests FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete contests"
ON public.contests FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_contests_updated_at
BEFORE UPDATE ON public.contests
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Resources
CREATE TABLE public.resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'Ladder',
  level text NOT NULL DEFAULT 'Beginner',
  href text NOT NULL,
  author text,
  platform text,
  tags text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.resources TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.resources TO authenticated;
GRANT ALL ON public.resources TO service_role;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Resources are publicly viewable"
ON public.resources FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins can insert resources"
ON public.resources FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update resources"
ON public.resources FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete resources"
ON public.resources FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_resources_updated_at
BEFORE UPDATE ON public.resources
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed current site content
INSERT INTO public.contests (title, platform, difficulty, prize, tags, participants, starts_at, status) VALUES
('Weekly Sprint #142', 'Codeforces Mirror', 'Intermediate', '$500 pool', ARRAY['Graphs','DP','Greedy'], 1284, now() + interval '5 hours 42 minutes', 'upcoming'),
('Monthly Grandmaster Cup', 'Competitive Coders Arena', 'Advanced', '$2,000 pool', ARRAY['Number Theory','Flows'], 3417, now() + interval '2 days 9 hours', 'upcoming'),
('Beginner Ladder: Arrays', 'LeetCode Track', 'Beginner', 'Badges + streak XP', ARRAY['Two Pointers','Hashing'], 862, now() + interval '21 hours 15 minutes', 'upcoming');

INSERT INTO public.resources (title, description, category, level, href) VALUES
('Graph Theory Ladder', '60 curated problems from BFS/DFS basics to flows and matchings.', 'Ladder', 'Intermediate', 'https://codeforces.com/problemset'),
('Dynamic Programming Playbook', 'Pattern-by-pattern DP breakdown with recurrences and code templates.', 'Course', 'Intermediate', 'https://youtube.com/@competitivecoders'),
('C++ Contest Template', 'Battle-tested competitive template: fast IO, debug macros, common structs.', 'Template', 'Beginner', 'https://github.com/'),
('Number Theory Essentials', 'Modular arithmetic, sieves, CRT and combinatorics for rated rounds.', 'Course', 'Advanced', 'https://youtube.com/@competitivecoders'),
('Weekly Contest Editorials', 'Video walkthroughs for every Competitive Coders weekly sprint.', 'Editorial', 'Intermediate', 'https://youtube.com/@competitivecoders'),
('Beginner Array Ladder', 'Start here: prefix sums, two pointers, sliding window and hashing.', 'Ladder', 'Beginner', 'https://leetcode.com/problemset/');