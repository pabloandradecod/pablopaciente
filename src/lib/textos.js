// Todos os textos fixos do sistema ficam aqui para facilitar revisão.
// Regras: sem promessa de cura ou resultado; usar "segmento tratado";
// nunca "vértebra fora do lugar", "deslocada" ou "colocada no lugar".

export const TEXTOS = {
  profissional: 'Dr. Pablo Andrade',
  especialidade: 'Fisioterapia e Quiropraxia',
  cidade: 'Três Pontas, MG',

  rodapeLegal:
    'Este é um resumo para você. O prontuário oficial fica sob guarda do profissional.',

  // Mensagem enviada pelo Pablo ao gerar o link. {nome} e {link} são substituídos.
  mensagemLinkPadrao:
    'Olá, {nome}! Aqui é o Dr. Pablo Andrade. Preparei uma página só sua com o resumo da sua avaliação, ' +
    'os segmentos tratados e os seus exercícios: {link}\n\n' +
    'Na primeira vez, ela pede sua data de nascimento para confirmar que é você. ' +
    'Se travar de novo, use o botão "Pedir retorno" na própria página.',

  sos: {
    botao: 'Travou de novo? Pedir retorno',
    titulo: 'Antes de pedir seu retorno',
    subtitulo: 'Responda 3 perguntas rápidas. Elas ajudam a identificar sinais que precisam de atendimento de urgência.',
    perguntas: [
      { chave: 'dormencia_virilha', texto: 'Você está com dormência na virilha ou na região entre as pernas?' },
      { chave: 'perda_forca', texto: 'Você está com perda de força na perna?' },
      { chave: 'alteracao_urina_fezes', texto: 'Você notou alteração para urinar ou evacuar?' }
    ],
    alertaTitulo: 'Procure o pronto-socorro agora',
    alertaTexto:
      'Esses sinais podem indicar compressão de nervos na parte baixa da coluna (síndrome da cauda equina), ' +
      'uma situação que precisa de avaliação médica imediata. Não espere pelo retorno no consultório.',
    alertaAcao: 'Ligar para o SAMU (192)',
    expectativa: 'Você tem preferência nos horários de retorno.',
    confirmar: 'Enviar pedido pelo WhatsApp',
    mensagem: 'Sou {nome}, paciente do Dr. Pablo, e travei de novo. Quero agendar um retorno.',
    enviado: 'Pedido registrado. Se o WhatsApp não abriu, toque no botão abaixo.'
  }
}

export function preencher(modelo, valores) {
  return modelo.replace(/\{(\w+)\}/g, (_, k) => valores[k] ?? '')
}
