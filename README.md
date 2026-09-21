# DentistaPerto

Portal para pesquisar atendimento odontológico por cidade e consultar informações sobre procedimentos, especialidades e faixas de preço. O site organiza a busca e encaminha o visitante para uma plataforma parceira de agendamento.

[Abrir o site](https://dentista-perto.vercel.app)

## Como funciona

O visitante pode buscar uma cidade pelo nome ou navegar pelo mapa do Brasil. As páginas locais reúnem informações sobre a região e dão acesso aos conteúdos sobre tratamentos. Os botões de atendimento levam ao parceiro configurado no projeto, atualmente o OdontoConnect.

- Busca por cidade e navegação por estado em um mapa interativo.
- Páginas de cidades e combinações de procedimento e cidade.
- Conteúdo sobre especialidades, preços e cuidados odontológicos.
- Blog, sitemap e metadados para indexação.
- Links de encaminhamento com parâmetros de origem da visita.

O agendamento ocorre na plataforma parceira. As faixas de preço são referências informativas; não são orçamentos emitidos por uma clínica nem consultas em tempo real a prestadores.

## Executar localmente

Instale uma versão de Node.js compatível com o Next.js indicado em `package.json`.

```bash
npm ci
npm run dev
```

Abra <http://localhost:3000>. Para configurar domínio, analytics e parceiro, copie `.env.local.example` para `.env.local` e ajuste os valores. Variáveis com prefixo `NEXT_PUBLIC_` ficam acessíveis ao navegador.

```bash
npm run lint
npm run build
npm start
```

## Organização

| Pasta | Conteúdo |
| --- | --- |
| `src/app/` | Páginas, rotas, metadados e sitemap |
| `src/components/` | Busca, mapa, cartões e componentes de interface |
| `src/lib/` | Acesso aos dados, configuração do parceiro e funções auxiliares |
| `data/` | Cidades, procedimentos, especialidades e conteúdo editorial |
| `scripts/` | Coleta e preparação de referências municipais e profissionais |

Os scripts de preparação usam referências do IBGE e do CFO. A interface lê os arquivos do projeto; a cobertura e a atualidade dependem desses arquivos.

## Tecnologias

Next.js, React, TypeScript, Tailwind CSS e Framer Motion.

Desenvolvido por [Murilo Narciso](https://www.linkedin.com/in/murilonarciso/).
