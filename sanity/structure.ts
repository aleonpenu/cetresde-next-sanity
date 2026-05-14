import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .title('Contenido')
        .child(
          S.list()
            .title('Contenido')
            .items([
              S.documentTypeListItem('service').title('Servicios'),
              S.documentTypeListItem('portfolioItem').title('Portfolio'),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Configuración')
        .child(
          S.list()
            .title('Configuración')
            .items([
              S.listItem()
                .title('Configuración del Sitio')
                .child(
                  S.document()
                    .schemaType('siteConfig')
                    .documentId('siteConfig')
                    .title('Configuración del Sitio')
                ),
            ])
        ),
      S.listItem()
        .title('Diseño')
        .child(
          S.list()
            .title('Diseño')
            .items([
              S.documentTypeListItem('themeConfig').title('Temas'),
            ])
        ),
    ])