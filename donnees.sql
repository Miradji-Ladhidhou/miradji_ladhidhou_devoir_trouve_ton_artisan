USE artisans;

-- Insert categories
INSERT INTO categories (nom) VALUES
('Alimentation'),
('Bâtiment'),
('Fabrication'),
('Services');

-- Insert specialites
INSERT INTO specialites (nom, categorie_id) VALUES
-- Alimentation (ID 1)
('Boucher', 1),
('Boulanger', 1),
('Chocolatier', 1),
('Traiteur', 1),

-- Bâtiment (ID 2)
('Chauffagiste', 2),
('Electricien', 2),
('Menuisier', 2),
('Plombier', 2),

-- Fabrication (ID 3)
('Bijoutier', 3),
('Couturier', 3),
('Ferronier', 3),

-- Services (ID 4)
('Coiffeur', 4),
('Fleuriste', 4),
('Toiletteur', 4),
('Webdesign', 4);

-- Insert artisans
INSERT INTO artisans (nom, specialite_id, note, ville, a_propos, email, site_web) VALUES
('Boucherie Dumont', 1, 4.5, 'Lyon', 'Lorem ipsum...', 'boucherie.dumond@gmail.com', NULL),
('Au pain chaud', 2, 4.8, 'Montélimar', 'Lorem ipsum...', 'aupainchaud@hotmail.com', NULL),
('Chocolaterie Labbé', 3, 4.9, 'Lyon', 'Lorem ipsum...', 'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr'),
('Traiteur Truchon', 4, 4.1, 'Lyon', 'Lorem ipsum...', 'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr'),

('Orville Salmons', 5, 5.0, 'Evian', 'Lorem ipsum...', 'o-salmons@live.com', NULL),
('Mont Blanc Eléctricité', 6, 4.5, 'Chamonix', 'Lorem ipsum...', 'contact@mont-blanc-electricite.com', 'https://mont-blanc-electricite.com'),
('Boutot & fils', 7, 4.7, 'Bourg-en-bresse', 'Lorem ipsum...', 'boutot-menuiserie@gmail.com', 'https://boutot-menuiserie.com'),
('Vallis Bellemare', 8, 4.0, 'Vienne', 'Lorem ipsum...', 'v.bellemare@gmail.com', 'https://plomberie-bellemare.com'),

('Claude Quinn', 9, 4.2, 'Aix-les-bains', 'Lorem ipsum...', 'claude.quinn@gmail.com', NULL),
('Amitee Lécuyer', 10, 4.5, 'Annecy', 'Lorem ipsum...', 'a.amitee@hotmail.com', 'https://lecuyer-couture.com'),
('Ernest Carignan', 11, 5.0, 'Le Puy-en-Velay', 'Lorem ipsum...', 'e-carigan@hotmail.com', NULL),

('Royden Charbonneau', 12, 3.8, 'Saint-Priest', 'Lorem ipsum...', 'r.charbonneau@gmail.com', NULL),
('Leala Dennis', 12, 3.8, 'Chambéry', 'Lorem ipsum...', 'l.dennos@hotmail.fr', 'https://coiffure-leala-chambery.fr'),
("C'est sup'hair", 12, 4.1, 'Romans-sur-Isère', 'Lorem ipsum...', 'sup-hair@gmail.com', 'https://sup-hair.fr'),

('Le monde des fleurs', 13, 4.6, 'Annonay', 'Lorem ipsum...', 'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr'),
('Valérie Laderoute', 14, 4.5, 'Valence', 'Lorem ipsum...', 'v-laredoute@gmail.com', NULL),
('CM Graphisme', 15, 4.4, 'Valence', 'Lorem ipsum...', 'contact@cm-graphisme.com', 'https://cm-graphisme.com');
