# -*- coding: utf-8 -*-
"""Roteiro do vídeo "Dor Ciática com o Professor Pablo".

Cada cena tem um tipo visual (desenhado em render/scenes.js) e uma lista de
"beats": frases narradas. Cada beat pode levar pistas visuais (cue) que a cena
usa para revelar elementos, trocar pose do Pablo ou tocar efeitos sonoros.
"""

def S(type, beats, **params):
    return {"type": type, "params": params, "beats": [
        b if isinstance(b, dict) else {"text": b} for b in beats]}

def B(text, **cue):
    return {"text": text, **cue}

def chapter(n, title, line):
    return S("chapter", [B(line, sfx="whoosh", pose="open")], n=n, title=title)

SCENES = [
    # ---------------------------------------------------------------- abertura
    S("coldopen", [
        B("Sabe aquele choque que começa no bumbum, desce pela perna, e parece que alguém ligou você na tomada?", sfx="zap", pose="clasp"),
        B("Ou aquela queimação que faz você sentar torto, levantar devagarinho, e andar igual a um pinguim desconfiado?", sfx="boing", pose="think"),
        B("Pois é. Isso tem nome, sobrenome e endereço: dor ciática!", sfx="stamp", pose="point"),
        B("E hoje eu vou te explicar tudo sobre ela, do jeito mais simples e divertido que você já viu.", pose="open"),
        B("Eu sou o Professor Pablo, fisioterapeuta. E nos próximos minutos você vai descobrir o que está acontecendo aí dentro, quando é perigoso, e os erros que quase todo mundo comete.", pose="clasp"),
        B("E ainda vai aprender os exercícios que podem te ajudar a sair dessa.", pose="thumbs", sfx="pop"),
        B("Fica até o final, porque eu separei um desafio de verdade ou mito que vai derrubar muita coisa que te contaram por aí. Bora?", pose="open", sfx="ding"),
    ]),
    S("title", [B("Dor ciática: o guia completo, e sem enrolação, do Professor Pablo!", sfx="tada")]),

    # ---------------------------------------------------------- capítulo 1
    chapter(1, "Conhecendo o nervo ciático", "Capítulo um. Conhecendo o nervo ciático."),
    S("nerve", [
        B("Primeiro, vamos conhecer o personagem principal da nossa história: o nervo ciático.", step=0, pose="point"),
        B("Ele é simplesmente o maior e mais grosso nervo do corpo humano. Em alguns pontos, ele tem a grossura de um dedo!", step=1, sfx="pop", pose="open"),
        B("Ele nasce lá embaixo, na coluna lombar, formado por várias raízes nervosas que saem entre as vértebras.", step=2, pose="point"),
        B("Essas raízes se juntam como fios formando um cabo, passam por dentro do bumbum, e descem pela parte de trás da coxa.", step=3, sfx="whoosh", pose="point"),
        B("Lá perto do joelho, ele se divide em dois ramos, que vão até a perna e o pé.", step=4, pose="clasp"),
        B("Pensa nele como o cabo de energia da sua perna. Ele leva os comandos do cérebro até os músculos, e traz de volta as sensações da pele.", step=5, pose="open"),
        B("Então, quando alguma coisa aperta ou irrita esse cabo, acontece o famoso curto-circuito!", step=6, sfx="zap", pose="shock"),
    ], pablo="right"),
    S("bigtext", [
        B("E aqui vai a primeira lição importante: ciática não é uma doença.", step=0, pose="point", sfx="pop"),
        B("Ciática é um sintoma!", step=1, sfx="stamp", pose="point"),
        B("É o nervo avisando: ei, tem alguma coisa me incomodando aqui! E a pergunta certa é: o quê?", step=2, pose="think"),
    ], pablo="right", lines=["CIÁTICA NÃO É DOENÇA...", "É UM SINTOMA!", "O nervo está avisando: tem algo me incomodando!"]),

    # ---------------------------------------------------------- capítulo 2
    chapter(2, "Por que o nervo reclama?", "Capítulo dois. Por que o nervo reclama?"),
    S("disc", [
        B("A causa mais comum, de longe, é a hérnia de disco. E para entender, eu quero que você imagine um sonho de padaria.", step=0, pose="open", sfx="pop"),
        B("Entre uma vértebra e outra existe um disco, que funciona como um amortecedor.", step=1, pose="point"),
        B("Por fora, ele tem uma capa firme, como a massa do sonho. Por dentro, tem um miolo gelatinoso, como o recheio.", step=2, pose="point"),
        B("Com o tempo, com esforço, ou às vezes sem motivo nenhum, essa capa pode ganhar pequenas rachaduras.", step=3, sfx="crack", pose="think"),
        B("E o recheio começa a escapar pela rachadura. Isso é a hérnia de disco!", step=4, sfx="squish", pose="shock"),
        B("Se esse recheio escapa bem na direção da raiz nervosa, ele encosta no nervo.", step=5, pose="point"),
        B("E tem um detalhe que pouca gente sabe: esse recheio é inflamatório. Ele não só aperta, ele irrita quimicamente o nervo.", step=6, sfx="zap", pose="open"),
        B("Por isso, às vezes, uma hérnia pequenininha dói muito, e uma hérnia enorme quase não dói. Não é só o tamanho, é a inflamação.", step=7, pose="think"),
    ], pablo="right"),
    S("stenosis", [
        B("A segunda causa, mais comum depois dos cinquenta anos, é a estenose do canal vertebral.", step=0, pose="point"),
        B("Imagina um corredor por onde os nervos passam. Com os anos, esse corredor vai ficando mais estreito, por causa da artrose, de ligamentos mais grossos e dos famosos bicos de papagaio.", step=1, pose="open"),
        B("A pessoa com estenose geralmente sente a perna pesada e dolorida quando anda, ou quando fica muito tempo em pé.", step=2, pose="think"),
        B("E melhora quando senta, ou inclina o corpo para frente. É o famoso sinal do carrinho de supermercado: apoiada no carrinho, ela anda o mercado inteiro!", step=3, sfx="boing", pose="thumbs"),
    ], pablo="left"),
    S("piriformis", [
        B("Terceiro suspeito: o músculo piriforme. Ele é um músculo pequeno, que fica bem lá no fundo do bumbum.", step=0, pose="point"),
        B("E em algumas pessoas, o nervo ciático passa coladinho nele, ou até por dentro dele.", step=1, pose="point"),
        B("Quando esse músculo fica tenso ou irritado, ele pode dar um abraço apertado demais no nervo. Um abraço de urso nada carinhoso!", step=2, sfx="squish", pose="clasp"),
        B("Esse caso é bem menos comum do que a internet faz parecer, mas existe. E costuma piorar quando a pessoa fica muito tempo sentada.", step=3, pose="think"),
    ], pablo="right"),
    S("board", [
        B("E ainda existem outros suspeitos.", pose="point"),
        B("O escorregamento de uma vértebra sobre a outra, chamado espondilolistese.", item="Espondilolistese: vértebra escorregando", sfx="pop", pose="point"),
        B("E, bem mais raramente, infecções ou tumores.", item="Raro: infecções e tumores", sfx="pop", pose="think"),
        B("Por isso, uma boa avaliação, com um profissional, faz toda a diferença.", item="Avaliação profissional faz a diferença!", sfx="ding", pose="thumbs"),
    ], pablo="right", title="Outros suspeitos"),

    # ---------------------------------------------------------- capítulo 3
    chapter(3, "Como saber se é ciática?", "Capítulo três. Como saber se é ciática?"),
    S("symptoms", [
        B("Agora vamos aos sintomas. A dor ciática tem uma personalidade bem marcante.", step=0, pose="open"),
        B("Ela costuma ser em choque, como uma descarga elétrica.", step=1, sfx="zap", pose="shock"),
        B("Ou em queimação, como se a perna estivesse pegando fogo por dentro.", step=2, sfx="fire", pose="point"),
        B("Pode vir com formigamento, aquela sensação de formiguinhas passeando na pele.", step=3, sfx="pop", pose="think"),
        B("E às vezes com dormência, como se a perna tivesse adormecido e esquecido de acordar.", step=4, sfx="pop", pose="clasp"),
        B("E o mais importante: geralmente ela desce pela perna, passa do joelho, e às vezes chega até o pé.", step=5, pose="point"),
    ], pablo="left"),
    S("compare", [
        B("Aqui está uma diferença que muita gente confunde. A dor lombar comum fica ali nas costas, e às vezes desce um pouco para o bumbum ou a coxa.", step=0, pose="point"),
        B("Já a dor do nervo, a dor ciática de verdade, costuma doer mais na perna do que nas costas. E desce abaixo do joelho, seguindo uma faixa bem definida.", step=1, pose="point"),
        B("Outra pista: ela costuma piorar quando você tosse, espirra, ou faz força no banheiro. Isso aumenta a pressão lá dentro, e o nervo reclama na hora!", step=2, sfx="boing", pose="shock"),
        B("E geralmente acontece de um lado só. Uma perna sofre, e a outra fica só olhando.", step=3, pose="think"),
    ]),
    S("slr", [
        B("Na avaliação, o fisioterapeuta ou o médico costuma fazer um teste clássico: o teste de elevação da perna estendida, também chamado de sinal de Lasègue.", step=0, pose="point"),
        B("Você fica deitado, e a gente levanta a sua perna esticada, bem devagar.", step=1, pose="open"),
        B("Se, entre trinta e setenta graus, aquele choque desce pela perna, é um sinal de que o nervo está sensível.", step=2, sfx="zap", pose="point"),
        B("Mas atenção: isso é só uma peça do quebra-cabeça. O diagnóstico junta a sua história, o exame físico e, só quando necessário, os exames de imagem.", step=3, pose="clasp"),
    ], pablo="left"),

    # ---------------------------------------------------------- capítulo 4
    chapter(4, "Sinal vermelho!", "Capítulo quatro. Sinal vermelho: quando correr para o pronto-socorro."),
    S("alert", [
        B("Agora presta muita atenção, porque essa parte é séria.", step=0, sfx="siren", pose="point"),
        B("Na grande maioria das vezes, a ciática não é perigosa. Mas existem alguns sinais de alarme.", step=0, pose="open"),
        B("Perda de controle do xixi ou do cocô, ou dificuldade de urinar de repente.", step=1, sfx="pop", pose="point"),
        B("Dormência na região íntima, na parte de dentro das coxas e no bumbum. Aquela área que encostaria numa sela de cavalo.", step=2, sfx="pop", pose="point"),
        B("Perna perdendo força rápido. Por exemplo, o pé começando a arrastar, ou fraqueza nas duas pernas.", step=3, sfx="pop", pose="point"),
        B("Ou dor acompanhada de febre, perda de peso sem explicação, ou histórico de câncer.", step=4, sfx="pop", pose="point"),
        B("Se você tiver qualquer um desses sinais, não espera, não pesquisa mais na internet, e não marca para a semana que vem. Vai direto para a emergência!", step=5, sfx="siren", pose="shock"),
        B("Pode ser a síndrome da cauda equina, uma compressão grave dos nervos, que precisa de tratamento urgente. É rara, mas é coisa séria.", step=5, pose="clasp"),
    ], pablo="right"),

    # ---------------------------------------------------------- capítulo 5
    chapter(5, "A notícia boa", "Capítulo cinco. A notícia boa que quase ninguém te conta."),
    S("chomp", [
        B("Agora vem a parte que eu mais gosto de contar. Respira fundo, que é notícia boa!", step=0, pose="open", sfx="ding"),
        B("A maioria das pessoas com ciática melhora bastante em algumas semanas, geralmente entre seis e doze semanas, sem precisar de cirurgia.", step=1, pose="thumbs"),
        B("E sabe por quê? Porque o seu corpo é muito esperto. Quando aquele recheio do disco escapa, o sistema de defesa enxerga ele como um invasor.", step=2, pose="point"),
        B("E manda umas células de limpeza, chamadas macrófagos, que vão literalmente comendo a hérnia aos pouquinhos. Como bolinhas comilonas de videogame!", step=3, sfx="chomp", pose="open"),
        B("Inclusive, as hérnias maiores, aquelas que assustam no laudo, são justamente as que mais costumam ser reabsorvidas!", step=4, sfx="ding", pose="thumbs"),
    ], pablo="right"),
    S("mri", [
        B("E falando em laudo, tem um dado que vai te deixar de queixo caído.", step=0, pose="think"),
        B("Quando os pesquisadores fazem ressonância em pessoas que não sentem dor nenhuma, olha só o que eles encontram.", step=0, pose="point"),
        B("Cerca de um terço dos jovens de vinte anos, sem dor nenhuma, já tem algum abaulamento de disco.", step=1, sfx="pop", pose="point"),
        B("E entre as pessoas de oitenta anos, também sem dor, mais de oitenta por cento têm!", step=2, sfx="pop", pose="shock"),
        B("Ou seja: ter uma hérnia no exame não significa que ela é a culpada pela sua dor. O exame é uma foto. E você é um filme!", step=3, sfx="stamp", pose="open"),
        B("Por isso, quem a gente trata é o paciente, e não a ressonância.", step=3, pose="thumbs"),
    ], pablo="right"),

    # ---------------------------------------------------------- capítulo 6
    chapter(6, "Verdade ou mito?", "Capítulo seis. Verdade ou mito? Valendo!"),
    S("myth", [
        B("Primeira afirmação: com ciática, o melhor é ficar de repouso absoluto na cama.", q=0, phase="ask", pose="think", sfx="tick"),
        B("Mito! Ficar dias deitado deixa os músculos fracos, a coluna rígida, e a dor pode durar até mais. O ideal é se manter ativo, dentro do possível, respeitando a dor.", q=0, phase="answer", pose="point", sfx="buzzer"),
        B("Segunda: toda hérnia de disco precisa de cirurgia.", q=1, phase="ask", pose="think", sfx="tick"),
        B("Mito! A grande maioria melhora com tratamento conservador. A cirurgia fica para casos específicos, como perda de força importante, os sinais de alarme, ou uma dor que não melhora mesmo com um bom tratamento.", q=1, phase="answer", pose="point", sfx="buzzer"),
        B("Terceira: o exercício certo pode ajudar a aliviar a ciática.", q=2, phase="ask", pose="think", sfx="tick"),
        B("Verdade! O movimento é um dos melhores remédios. Exercícios bem orientados ajudam o nervo a deslizar melhor, fortalecem, e devolvem a sua confiança.", q=2, phase="answer", pose="thumbs", sfx="ding"),
        B("Quarta: dor forte significa que o estrago é grande.", q=3, phase="ask", pose="think", sfx="tick"),
        B("Mito! A dor é um alarme, e o alarme de um nervo irritado fica sensível demais. Dor forte nem sempre significa lesão grave.", q=3, phase="answer", pose="point", sfx="buzzer"),
        B("Quinta: depois de uma crise de ciática, a coluna nunca mais vai ser a mesma.", q=4, phase="ask", pose="think", sfx="tick"),
        B("Mito! A sua coluna é forte, adaptável, e foi feita para se mexer. Uma crise não é uma sentença para a vida toda.", q=4, phase="answer", pose="open", sfx="buzzer"),
        B("E a última: estresse e sono ruim podem piorar a dor.", q=5, phase="ask", pose="think", sfx="tick"),
        B("Verdade! Dormir mal e viver estressado deixam o sistema nervoso mais sensível. Cuidar da cabeça também é cuidar da coluna.", q=5, phase="answer", pose="thumbs", sfx="ding"),
        B("E aí, quantas você acertou? Escreve aqui nos comentários o seu placar!", q=6, phase="score", pose="open", sfx="tada"),
    ], pablo="left", items=[
        "Repouso absoluto na cama é o melhor remédio",
        "Toda hérnia de disco precisa de cirurgia",
        "O exercício certo ajuda a aliviar a ciática",
        "Dor forte = estrago grande",
        "Depois de uma crise, a coluna nunca mais é a mesma",
        "Estresse e sono ruim podem piorar a dor",
    ], answers=[False, False, True, False, False, True]),

    # ---------------------------------------------------------- capítulo 7
    chapter(7, "Os 5 erros que pioram a ciática", "Capítulo sete. Os cinco erros que pioram a ciática."),
    S("errors", [
        B("Se você comete algum desses erros, não se sinta culpado. Só ajusta a partir de hoje.", step=0, pose="clasp"),
        B("Erro número um: esperar a dor zerar para voltar a se mexer. Se você esperar a dor ir embora para começar, vai esperar sentado. E ficar sentado é justamente o que piora!", step=1, sfx="buzzer", pose="point"),
        B("Erro número dois: alongar o nervo com força, puxando a perna até doer. Nervo irritado não gosta de ser esticado como elástico. Ele gosta de deslizar, com suavidade.", step=2, sfx="buzzer", pose="point"),
        B("Erro número três: passar horas sentado sem pausa. A cada trinta ou quarenta minutos, levanta, dá uma voltinha, bebe uma água.", step=3, sfx="buzzer", pose="point"),
        B("Erro número quatro: viver com medo de se mexer. O medo trava o corpo, e o corpo travado dói mais. A sua coluna não é de vidro!", step=4, sfx="buzzer", pose="shock"),
        B("E o erro número cinco: confiar só no remédio, ou só na massagem. Eles ajudam a aliviar, mas quem resolve de verdade é o movimento, a força e a informação.", step=5, sfx="buzzer", pose="open"),
    ], pablo="right", items=[
        "Esperar a dor zerar para se mexer",
        "Esticar o nervo com força",
        "Horas sentado sem pausa",
        "Medo de se mexer",
        "Só remédio ou só massagem",
    ]),

    # ---------------------------------------------------------- capítulo 8
    chapter(8, "Mão na massa: exercícios", "Capítulo oito. Mão na massa!"),
    S("traffic", [
        B("Antes dos exercícios, uma regra de ouro: a regra do semáforo da dor.", step=0, pose="point"),
        B("Durante o exercício, se a dor ficar entre zero e dois, numa escala de zero a dez, é sinal verde. Pode seguir.", step=1, sfx="ding", pose="thumbs"),
        B("Se ficar entre três e cinco, é sinal amarelo. Pode fazer, mas com cuidado, diminuindo o movimento.", step=2, sfx="pop", pose="open"),
        B("Se passar de cinco, ou se a dor começar a descer mais para o pé, é sinal vermelho. Para, e conversa com o seu fisioterapeuta.", step=3, sfx="buzzer", pose="shock"),
    ], pablo="right"),
    S("central", [
        B("E tem um sinal muito bom que eu quero que você conheça.", step=0, pose="point"),
        B("Se a dor sai do pé e vai voltando em direção à lombar, isso se chama centralização.", step=1, pose="point"),
        B("Mesmo que a lombar doa um pouquinho mais, a dor encolhendo da perna é um ótimo sinal. É o nervo dizendo: obrigado!", step=2, sfx="ding", pose="thumbs"),
    ], pablo="left"),
    S("exercise", [
        B("Exercício um: a posição de alívio. Deita de barriga para cima e apoia as pernas numa cadeira ou no sofá, com o quadril e os joelhos dobrados.", pose="point"),
        B("Essa posição tira a pressão da coluna e acalma o nervo. Fica aí respirando fundo, enchendo a barriga de ar, por dois a cinco minutos.", pose="open"),
    ], ex="relief", n=1, name="Posição de alívio", dose="2 a 5 minutos respirando"),
    S("exercise", [
        B("Exercício dois: o deslizamento do nervo. Senta na ponta da cadeira, com a coluna relaxada.", pose="point"),
        B("Agora estica o joelho e, ao mesmo tempo, olha para cima. Depois, dobra o joelho e olha para baixo.", pose="point"),
        B("Percebeu? Quando uma ponta do nervo estica, a outra solta. É como passar fio dental: o nervo desliza para lá e para cá, sem ser esticado. Faz de dez a quinze vezes, sem forçar.", pose="open"),
    ], ex="slider", n=2, name="Deslizamento do nervo", dose="10 a 15 vezes, sem forçar"),
    S("exercise", [
        B("Exercício três: a esfinge. Deita de barriga para baixo e apoia nos cotovelos, deixando a lombar curvar suavemente.", pose="point"),
        B("Fica de trinta segundos a um minuto. Se a dor centralizar, ótimo! Se a dor descer mais para a perna, esse não é o seu exercício agora. Pula ele.", pose="think"),
    ], ex="sphinx", n=3, name="Esfinge", dose="30 segundos a 1 minuto"),
    S("exercise", [
        B("Exercício quatro: a ponte. De barriga para cima, joelhos dobrados e pés no chão. Aperta o bumbum e sobe o quadril, sem arquear demais.", pose="point"),
        B("Segura dois segundos, e desce devagar. Faz duas a três séries de dez. Glúteo forte é um baita guarda-costas para a sua coluna!", pose="thumbs"),
    ], ex="bridge", n=4, name="Ponte", dose="2 a 3 séries de 10"),
    S("exercise", [
        B("Exercício cinco: a caminhada. Simples, gratuita e poderosa. Comece com cinco a dez minutos, algumas vezes por dia, e vá aumentando aos poucos.", pose="point"),
        B("Caminhar faz o sangue circular, nutre o disco, e ajuda o nervo a se acalmar. É remédio com efeito colateral bom!", pose="thumbs"),
    ], ex="walk", n=5, name="Caminhada", dose="5 a 10 minutos, várias vezes ao dia"),
    S("bigtext", [
        B("Lembrando: esses exercícios são educativos. Cada caso é um caso, e o ideal é ter um fisioterapeuta ajustando tudo para você.", step=0, pose="clasp"),
    ], pablo="right", lines=["Cada caso é um caso!", "", "Procure um fisioterapeuta para ajustar tudo para você."], warn=True),

    # ---------------------------------------------------------- capítulo 9
    chapter(9, "Coluna feliz no dia a dia", "Capítulo nove. Coluna feliz no dia a dia."),
    S("board", [
        B("Para fechar, algumas dicas que fazem uma diferença enorme.", pose="open"),
        B("Primeira: a melhor postura é a próxima postura. Não existe uma posição perfeita. O segredo é variar de posição.", item="A melhor postura é a PRÓXIMA", sfx="pop", pose="point"),
        B("Segunda: para dormir, experimenta deitar de lado com um travesseiro entre os joelhos, ou de barriga para cima, com um travesseiro embaixo deles.", item="Travesseiro entre ou sob os joelhos", sfx="pop", pose="point"),
        B("Terceira: fortalecimento regular. Pernas, glúteos e abdômen fortes protegem a coluna como uma armadura.", item="Fortalecer pernas, glúteos e abdômen", sfx="pop", pose="thumbs"),
        B("Quarta: cuida do sono, do estresse e do peso. A sua coluna sente tudo o que acontece com você.", item="Sono, estresse e peso em dia", sfx="pop", pose="clasp"),
        B("E quinta: para pegar algo no chão, traz o objeto perto do corpo e usa as pernas. Mas sem neura! A sua coluna aguenta muito mais do que você imagina.", item="Objeto perto do corpo, sem neura", sfx="pop", pose="open"),
    ], pablo="right", title="5 dicas de ouro"),

    # ---------------------------------------------------------------- final
    S("recap", [
        B("Bom, vamos recapitular rapidinho.", step=0, pose="open", sfx="whoosh"),
        B("Ciática é um sintoma. É o nervo ciático irritado, e a causa mais comum é a hérnia de disco.", step=1, sfx="pop", pose="point"),
        B("Teve sinal de alarme? Emergência, sem pensar duas vezes.", step=2, sfx="pop", pose="point"),
        B("A maioria das pessoas melhora em semanas, e o corpo consegue até reabsorver a hérnia.", step=3, sfx="pop", pose="thumbs"),
        B("Movimento, exercício bem orientado e informação são os seus maiores aliados.", step=4, sfx="pop", pose="open"),
    ], pablo="right"),
    S("outro", [
        B("Se esse vídeo te ajudou, deixa o seu like, se inscreve no canal, e manda para aquela pessoa que vive reclamando da ciática. Ela vai te agradecer!", step=0, sfx="pop", pose="thumbs"),
        B("Eu sou o Professor Pablo. E lembra: coluna boa é coluna que se mexe! Até o próximo vídeo!", step=1, sfx="tada", pose="wave"),
    ]),
]

if __name__ == "__main__":
    words = sum(len(b["text"].split()) for s in SCENES for b in s["beats"])
    print(len(SCENES), "cenas,", sum(len(s["beats"]) for s in SCENES), "falas,", words, "palavras")
