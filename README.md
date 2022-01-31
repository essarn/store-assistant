# Store Assistant

Det här projektet är en fullstack app med målet att förenkla den dagliga butiksdriften genom smarta tekniska funktioner i form av en mobilapp.

Testa lokalt med `pnpm i && pnpm dev`.

## Stack

Backenden är en node app som är byggd med Fastify och en GraphQL API. För tillfället används ingen lokal databas eftersom all information hämtas direkt från Willys egna API. Tanken är att senare använda en Postgres databas tillsammans med Prisma som ORM.

Frontenden är en Vue app med PWA support för enkel installation. Den är designad med Tailwind enligt mobile first men är inte ännu responsiv och bör därför visas på en mindre skärm.

## Aktuella funktioner

Dessa funktioner har stor potential för ytterligare utveckling om mer information kan hämtas från Willys API.

- Visa och filtrera bland pågående erbjudanden. För tillfället visas endast DR och LPL erbjudanden eftersom andra typer som BK inte kan nås för butiker som saknar e-handel. Det här kan däremot lösas genom att hämta dessa typer av erbjudanden från en butik med e-handel.

- Söka efter och visa resultat för produkter beroende på sökord. Resultat respekterar även den valda butiken men återigen fungerar inte detta för butiker utan e-handel. Det är planerat att även kunna söka beroende på en produkts SAP-id. EAN-sökning går inte att göra eftersom Willys API inte stödjer produktfrågor beroende på EAN eller att indexera alla nummer.

## Planerade funktioner

Många av dessa funktioner handlar om att digitalisera saker som idag exempelvis görs med papper och penna.

- Planera gavlar och torg för erbjudanden och ordinarie försälning.
- Skapa plockunderlag för saker som ska plockas fram empelvis från brödfrysen på morgonen.
- Skapa bakunderlag för hur mycket och vad som ska bakas under dagen.
- Rutiner för varje avdelning samt jour- och kvällsrutiner som kan följas och slutföras allt eftersom.
- Låta användaren påbörja en specifik passtyp som gör att innehållet anpassas till den passtypen beroende på dag och andra omstädigheter.
- Planera startvagnar för bake-offen med vad och hur mycket som ska ingå av varje sort.
- ... och mycket mer.
