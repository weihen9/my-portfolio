-- Job History Table
CREATE TABLE IF NOT EXISTS job_history (
  id SERIAL PRIMARY KEY,
  start_date VARCHAR(20) NOT NULL,
  end_date VARCHAR(20),
  company_name VARCHAR(255) NOT NULL,
  job_position VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}'
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  project_name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  github_repo_link VARCHAR(500),
  screenshot_url VARCHAR(500)
);

-- Insert sample job data
INSERT INTO job_history (start_date, end_date, company_name, job_position, description, technologies) VALUES
('Jul 2023', 'Aug 2023', 'PwC Singapore', 'Full Stack Engineer Intern', 
'Single-handedly developed a centralized Service Hub software from the ground up. Using Power Apps, Power Automate, and SharePoint as the backbone, I created a self-service platform that streamlined administrative processes and simplified onboarding for new employees. Designed the entire hub''s UI/UX experience from scratch, transforming a theoretical requirements list into a functional, user-friendly interface. While my attempt at Copilot integration remained a work-in-progress by internship''s end, the experience was invaluable—it not only sharpened my technical skills but also ignited my genuine interest in AI applications.',
ARRAY['Power Apps', 'Power Automate', 'SharePoint', 'UI/UX Design', 'AI Integration']);

-- Insert sample project data
INSERT INTO projects (project_name, description, technologies, github_repo_link, screenshot_url) VALUES
('Service Hub', 'Centralized employee self-service platform for PwC. Streamlined administrative processes and onboarding with intuitive UI/UX design.', 
ARRAY['Power Apps', 'Power Automate', 'SharePoint'], 
'https://github.com/yourusername/service-hub', 
'https://i.imgur.com/example-screenshot.jpg');