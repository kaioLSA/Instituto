import { smoothScrollTo } from "./smoothScrollTo.jsx";
import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "../assets";

export const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#features",
    onClick: (e) => {
      e.preventDefault();
      smoothScrollTo("features");
    }
  },
  {
    id: "1",
    title: "How to use",
    url: "#how-to-use",
    onClick: (e) => {
      e.preventDefault();
      smoothScrollTo("how-to-use");
    }
  },
  {
    id: "2",
    title: "Pricing",
    url: "#pricing",
    onClick: (e) => {
      e.preventDefault();
      smoothScrollTo("pricing");
    }
  },
  {
    id: "3",
    title: "Roadmap",
    url: "#roadmap",
    onClick: (e) => {
      e.preventDefault();
      smoothScrollTo("roadmap");
    }
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
  "Atendimento Automatizado",
  "Análise de Dados",
  "Gestão de Tarefas",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Reconhecimento de Voz",
    text: "Permita que o agente entenda e responda a comandos de voz, oferecendo uma interação prática e mãos livres para os usuários.",
    date: "May 2025",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Gamificação",
    text: "Adicione elementos divertidos, como medalhas, rankings e recompensas, para motivar os usuários a interagir mais com o agente.",
    date: "May 2025",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Personalização do Agente",
    text: "Dê ao usuário o controle total: ajuste cores, avatar, tom de voz e estilo de resposta para criar uma experiência única e cativante.",
    date: "May 2025",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Integração com APIs",
    text: "Permita que o agente acesse dados externos em tempo real, como previsão do tempo, notícias ou serviços, para oferecer respostas mais precisas e úteis.",
    date: "May 2025",
    status: "done",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "Com processamento 24/7 e aprendizado contínuo, é o parceiro perfeito para negócios que não podem parar.";

export const collabText1 =
  "Com automação inteligente e segurança de ponta, é a solução perfeita para equipes que buscam trabalhar de forma mais inteligente.";

export const collabContent = [
  {
    id: "0",
    title: "Integração perfeita",
    text: collabText1,
  },
  {
    id: "1",
    title: "Automação Inteligente",
  },
  {
    id: "2",
    title: "Segurança de alto nível",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Pessoal",
    description: "O assistente pessoal de IA que cuida das tarefas chatas pra você",
    price: null,
    features: [
      "Um assistente que entende sua rotina",
      "Soluções feitas sob medida",
      "Tarefas automáticas que economizam seu tempo",
    ],
  },
  {
    id: "1",
    title: "Empresa",
    description: "Automação inteligente, integração total, resultados mensuráveis",
    price: null,
    features: [
      "Um agente de IA que pode entender suas dúvidas",
      "Recomendações personalizadas com base em suas preferências",
      "Capacidade de explorar o aplicativo e seus recursos sem nenhum custo",
    ],
  },
  {
    id: "2",
    title: "Equipes",
    description: "Equipe 24/7: humanos criando, IA executando e todos escalando.",
    price: null,
    features: [
      "Automatize tarefas, ganhe tempo",
      "IA que trabalha com sua equipe",
      "Soluções sob medida, sem complicação",
    ],
  },
];

export const benefits = [
  {
    id: "0",
    title: "Pergunte qualquer coisa",
    text: "Permite que os usuários automatizem tarefas complexas com comandos simples, sem necessidade de conhecimentos técnicos.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
    popupTitle: "Pergunte Qualquer Coisa",
    popupContent: [
      "AUTOMAÇÃO SIMPLES E PODEROSA",
      "Nosso assistente de IA transforma comandos em linguagem natural em ações automatizadas, eliminando a necessidade de conhecimentos técnicos.",
      "Diga 'Envie um relatório semanal das vendas para minha equipe toda sexta às 17h' e o sistema cuida de tudo - desde a coleta de dados até o envio por e-mail.",
      "Ideal para poupar tempo e reduzir erros em tarefas repetitivas.",
      "Com integração a ferramentas como Google Workspace, Outlook e CRMs, você automatiza processos diretamente no seu fluxo de trabalho.",
      "Quanto mais usa, mais o sistema aprende com suas preferências, oferecendo resultados cada vez mais precisos e personalizados."
    ]
  },
  {
    id: "1",
    title: "Automatize trabalhos",
    text: "Agentes de IA que assumem tarefas repetitivas, liberando tempo para atividades mais estratégicas.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
    popupTitle: "Automatize Trabalhos",
    popupContent: [
      "LIBERE SEU TEMPO PARA O QUE REALMENTE IMPORTA",
      "Nossos agentes de IA podem assumir uma variedade de tarefas repetitivas, desde organização de e-mails até geração de relatórios complexos.",
      "Configure uma vez e deixe o sistema trabalhar para você indefinidamente.",
      "Reduza erros humanos e aumente a consistência em seus processos.",
      "Diga 'Monitore meu e-mail e categorize mensagens importantes' e nosso sistema fará o resto.",
      "A automação inteligente adapta-se ao seu estilo de trabalho, aprendendo com seus padrões e preferências."
    ]
  },
  {
    id: "2",
    title: "Integração fácil",
    text: "Conecte-se a qualquer ferramenta ou plataforma com facilidade, tornando a automação acessível em todos os sistemas.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
    popupTitle: "Integração Fácil",
    popupContent: [
      "CONECTE TODAS AS SUAS FERRAMENTAS",
      "Nosso sistema integra-se perfeitamente com as plataformas que você já usa no dia a dia.",
      "De CRMs a ferramentas de produtividade, conectamos tudo em um único fluxo de trabalho automatizado.",
      "Diga 'Quando receber um novo lead no CRM, envie um e-mail de boas-vindas e adicione à lista do Mailchimp' e considere feito.",
      "Sem necessidade de APIs complexas ou conhecimentos técnicos - nossa IA cuida de todas as conexões.",
      "Suporte para mais de 100 aplicações populares e crescente."
    ]
  },
  {
    id: "3",
    title: "Respostas inteligentes",
    text: "Tecnologia de processamento de linguagem natural para entender e executar comandos com precisão.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
    popupTitle: "Respostas Inteligentes",
    popupContent: [
      "ENTENDIMENTO NATURAL DE LINGUAGEM",
      "Nossa IA avançada compreende contexto e nuance em seus comandos.",
      "Não precisa de frases específicas - entende o que você quer, mesmo que formule de diferentes maneiras.",
      "Diga 'Manda aquele relatório que eu pedi ontem para o chefe' e o sistema saberá exatamente o que fazer.",
      "Aprende com suas expressões e preferências para oferecer resultados cada vez mais precisos.",
      "Capacidade de entender múltiplos idiomas e dialetos regionais."
    ]
  },
  {
    id: "4",
    title: "Disponível 24/7",
    text: "Agentes de IA que trabalham sem pausas, falhas ou atrasos, garantindo eficiência a qualquer hora e em qualquer lugar.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
    popupTitle: "Disponível 24/7",
    popupContent: [
      "SEMPRE ATIVO, SEMPRE CONFIÁVEL",
      "Nossos agentes trabalham ininterruptamente, sem férias, folgas ou intervalos.",
      "Execute tarefas noturnas, processe dados em horários de pico ou gerencie operações globais sem preocupação.",
      "Diga 'Verifique os servidores a cada hora e me alerte se houver problemas' e durma tranquilo.",
      "Infraestrutura redundante garante 99.99% de disponibilidade.",
      "Atualizações e manutenções ocorrem sem interrupção do serviço."
    ]
  },
  {
    id: "5",
    title: "Melhoria contínua",
    text: "Aprendizado constante para adaptar-se às suas necessidades e oferecer resultados cada vez melhores.",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    popupTitle: "Melhoria Contínua",
    popupContent: [
      "EVOLUÇÃO CONSTANTE",
      "Nosso sistema aprende com cada interação para servir você melhor.",
      "Padrões de trabalho, preferências e até seu estilo de comunicação são incorporados para personalização contínua.",
      "Diga 'Não gostei desse formato de relatório, faça diferente' e o sistema se adaptará para futuras execuções.",
      "Atualizações automáticas trazem novos recursos e melhorias sem necessidade de intervenção.",
      "Relatórios periódicos mostram como a eficiência tem aumentado com o tempo."
    ]
  }
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
