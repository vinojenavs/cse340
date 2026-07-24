CREATE TABLE organization (
	organization_id SERIAL PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	contact_email VARCHAR(250) NOT NULL,
	logo_filename VARCHAR(250) NOT NULL
);

INSERT INTO organization (organization_id, name, description, contact_email, logo_filename)
VALUES 
	(1, 'BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
	(2, 'GreenHarvest Grows', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
	(3, 'UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

CREATE TABLE projects (
	project_id SERIAL PRIMARY KEY,
	title char(150) NOT NULL,
	description text NOT NULL,
	location char(200) NOT NULL,
	project_date date,
	organization_id INT NOT NULL,
	CONSTRAINT fk_organization
	FOREIGN KEY (organization_id)
	REFERENCES organization (organization_id)
	ON DELETE CASCADE
);

INSERT INTO projects (title, description, location, project_date, organization_id) VALUES
('Community Solar Installation', 'Installing solar panels on a local school to reduce energy costs and promote sustainability.', 'Ibadan, Nigeria', '2026-08-15', 1),
('Water Access Pipeline Project', 'Building a pipeline to provide clean water to underserved communities.', 'Kano, Nigeria', '2026-09-10', 1),
('Eco-Friendly Housing Units', 'Constructing affordable housing using recycled materials.', 'Lagos, Nigeria', '2026-10-05', 1),
('Community Health Center Renovation', 'Renovating a rural health center with sustainable building practices.', 'Enugu, Nigeria', '2026-11-20', 1),
('Green Public Park Development', 'Creating a public park with eco-friendly landscaping and recreational facilities.', 'Abuja, Nigeria', '2026-12-12', 1);

INSERT INTO projects (title, description, location, project_date, organization_id) VALUES
('Urban Rooftop Garden Project', 'Establishing rooftop gardens to increase food sustainability in dense urban areas.', 'Lagos Island, Nigeria', '2026-08-22', 2),
('School Farming Education Program', 'Teaching students about urban farming and nutrition through hands-on workshops.', 'Port Harcourt, Nigeria', '2026-09-18', 2),
('Community Composting Initiative', 'Launching composting stations to reduce waste and enrich soil for farming.', 'Ibadan, Nigeria', '2026-10-12', 2),
('Hydroponic Farming Pilot', 'Introducing hydroponic farming systems to grow vegetables without soil.', 'Abuja, Nigeria', '2026-11-08', 2),
('Neighborhood Farmers’ Market', 'Organizing a weekly farmers’ market to connect urban growers with local residents.', 'Lagos Mainland, Nigeria', '2026-12-03', 2);

INSERT INTO projects (title, description, location, project_date, organization_id) VALUES
('Charity Food Drive', 'Coordinating volunteers to collect and distribute food to families in need.', 'Lagos, Nigeria', '2026-08-30', 3),
('Blood Donation Campaign', 'Partnering with hospitals to organize blood donation events.', 'Abuja, Nigeria', '2026-09-25', 3),
('Literacy Mentorship Program', 'Training volunteers to mentor children in reading and writing skills.', 'Kaduna, Nigeria', '2026-10-18', 3),
('Disaster Relief Support Team', 'Mobilizing volunteers to provide aid during flooding emergencies.', 'Bayelsa, Nigeria', '2026-11-14', 3),
('Holiday Toy Distribution', 'Collecting and distributing toys to children in orphanages during the holiday season.', 'Lagos, Nigeria', '2026-12-20', 3);

CREATE TABLE categories (
	category_id INT PRIMARY KEY,
	name char(150) NOT NULL
);

INSERT INTO categories(category_id, name) VALUES
	(1, 'Energy and Environment'),
	(2, 'Food and Education'),
	(3, 'Community and Social Support');

CREATE TABLE project_categories (
	category_id INT NOT NULL,
	project_id INT NOT NULL,
	CONSTRAINT fk_category_id
	FOREIGN KEY (category_id)
	REFERENCES categories (category_id)
	ON DELETE CASCADE,
	CONSTRAINT fk_project_id
	FOREIGN KEY (project_id)
	REFERENCES projects (project_id)
	ON DELETE CASCADE
);

INSERT INTO project_categories (category_id, project_id) VALUES
	(1, 1),
	(1, 8),
	(1, 14),
	(1, 3),
	(1, 9),
	(2, 7),
	(2, 13),
	(2, 11),
	(2, 6),
	(2, 4),
	(3, 5),
	(3, 10),
	(3, 12),
	(3, 15),
	(3, 2);