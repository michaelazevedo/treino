/* Hipertrofia Insana v2 — plano revisado pela literatura 2021–2026
   Volume semanal contado em séries fracionadas (Pelland et al., 2026):
   série direta = 1, série indireta (músculo sinergista) = 0,5. */

const E=(name,muscle,sets,reps,rest,rir,technique)=>({name,muscle,sets,reps,rest,rir,technique});
const X=(exercise,sets=exercise.sets)=>({...exercise,sets});

// Contribuição indireta (0,5) que cada exercício dá a músculos sinergistas
const secondary={
  'Supino inclinado no Smith':{'Tríceps':.5},
  'Chest press convergente':{'Tríceps':.5},
  'Supino inclinado convergente':{'Tríceps':.5},
  'Puxada alta com pegada neutra':{'Bíceps':.5},
  'Puxada unilateral no cabo':{'Bíceps':.5},
  'Remada articulada com peito apoiado':{'Bíceps':.5,'Ombro posterior':.5,'Trapézio':.5},
  'Remada baixa neutra no cabo':{'Bíceps':.5,'Ombro posterior':.5,'Trapézio':.5},
  'Crucifixo inverso na máquina':{'Trapézio':.5},
  'Hack squat':{'Adutores':.5},
  'Leg press 45°':{'Adutores':.5},
  'Agachamento pendular':{'Adutores':.5}
};

const L={
  // PEITO
  supIncSmith:E('Supino inclinado no Smith','Peito',3,'6–10','2–3 min','1–2','Banco em 15–30°. Desça ao peito alto em ~2 s, toque sem quicar e empurre com intenção máxima. Escápulas encaixadas o tempo todo.'),
  chestPress:E('Chest press convergente','Peito',3,'8–12','2 min','0–1','Pegadas na linha do meio do peito, máxima abertura sem dor no ombro. Última série: rest-pause (falha + 15 s + falha + 15 s + falha).'),
  cruzCabo:E('Crucifixo no cabo (polia média)','Peito',3,'10–15','90 s','0–1','Abra até o peitoral ficar bem alongado, cotovelos levemente flexionados e fixos. Após a falha da última série, faça 4–6 parciais na metade alongada.'),
  supIncConv:E('Supino inclinado convergente','Peito',3,'8–12','2 min','1','Foco no peitoral superior. Amplitude completa e pausa curta embaixo sem relaxar.'),
  peckDeck:E('Peck deck','Peito',3,'12–15','90 s','0–1','Mãos na altura do meio do peito. Priorize a abertura máxima controlada; parciais alongadas após a falha na última série.'),
  // OMBROS
  latCabo:E('Elevação lateral unilateral no cabo','Ombro lateral',3,'12–20','60–90 s','0–1','Cabo passando atrás do corpo, começando com o braço cruzado à frente (posição alongada). Conduza pelo cotovelo até a linha do ombro.'),
  latMaq:E('Elevação lateral na máquina','Ombro lateral',3,'12–20','60–90 s','0–1','Ombros baixos e cotovelos guiando. Última série: drop-set retirando 25–30% da carga.'),
  cruzInv:E('Crucifixo inverso na máquina','Ombro posterior',3,'12–20','60–90 s','0–1','Pegada neutra e peito apoiado. Abra em arco sem retrair demais as escápulas para manter o foco no deltoide posterior.'),
  latInclinado:E('Elevação lateral com halter deitado inclinado','Ombro lateral',2,'15–20','60 s','0–1','Banco a 30–45°, deite de lado. O braço começa na posição mais baixa possível — máximo alongamento do deltoide lateral. Suba até a linha do ombro sem impulso. Melhor posição de alongamento para o deltoide lateral dentre todos os exercícios.'),
  // TRÍCEPS
  tricFrances:E('Tríceps francês no cabo','Tríceps',3,'10–15','90 s','0–1','De costas para a polia, braços acima da cabeça: a cabeça longa trabalha alongada — cresceu bem mais que no pushdown nos estudos.'),
  tricV:E('Tríceps na barra V','Tríceps',2,'8–12','90 s','0','Cotovelos fixos ao lado do tronco. Última série com myo-reps: até a falha + 3–4 mini-séries de 3–5 reps com 5 respirações de pausa.'),
  tricCorda:E('Tríceps corda acima da cabeça','Tríceps',3,'10–15','90 s','0–1','Tronco inclinado à frente, cotovelos apontando para cima. Alongue totalmente atrás da cabeça.'),
  tricSupinado:E('Pushdown supinado no cabo','Tríceps',2,'12–15','75 s','0','Pegada supinada (palmas para cima) na barra reta ou corda. Cotovelos fixos ao lado, extend totalmente. A supinação aumenta o recrutamento da cabeça lateral — complemento perfeito ao francês que foca a cabeça longa.'),
  // COSTAS
  puxNeutra:E('Puxada alta com pegada neutra','Costas',3,'6–10','2–3 min','1–2','Alongue no topo deixando a escápula subir; puxe os cotovelos em direção ao quadril sem balançar o tronco.'),
  remArt:E('Remada articulada com peito apoiado','Costas',3,'8–12','2 min','0–1','Peito colado no apoio, lombar fora do jogo. Alongue à frente e puxe até os cotovelos passarem o tronco. Última série: rest-pause.'),
  puxUni:E('Puxada unilateral no cabo','Costas',2,'10–15','90 s','0–1','Ajoelhado ou sentado, deixe o braço subir até o alongamento total e puxe o cotovelo em linha com o quadril.'),
  remBaixa:E('Remada baixa neutra no cabo','Costas',3,'8–12','2 min','1','Tronco estável e quase vertical. Alongue à frente sem arredondar a lombar e puxe o triângulo até o abdômen.'),
  pullover:E('Pullover no cabo','Costas',3,'10–15','90 s','0–1','Braços quase estendidos e quadril para trás. Mova só o ombro, do alongamento acima da cabeça até a coxa.'),
  encMaq:E('Encolhimento na máquina','Trapézio',3,'10–15','90 s','0–1','Eleve reto em direção às orelhas, segure 1–2 s no topo e desça até o alongamento completo. Sem rotacionar.'),
  // BÍCEPS
  roscaInc:E('Rosca inclinada com halteres','Bíceps',3,'8–12','90 s','0–1','Banco a 45–60°, ombros atrás do tronco: o bíceps trabalha alongado. Cotovelos imóveis, sem impulso.'),
  roscaScott:E('Rosca Scott na máquina','Bíceps',2,'10–15','90 s','0','Braço inteiro no apoio. Desça até quase estender; após a falha, faça parciais na metade inferior (alongada).'),
  roscaBayes:E('Rosca Bayesian no cabo','Bíceps',3,'10–15','90 s','0–1','De costas para a polia, braço atrás do corpo. Alongue totalmente sem girar o tronco.'),
  // PERNAS
  hack:E('Hack squat','Quadríceps',3,'6–10','3 min','1–2','Desça o máximo que a mobilidade permitir mantendo a lombar no encosto — profundidade é o que mais estimula o quadríceps. Suba empurrando com o meio dos pés.'),
  legPress:E('Leg press 45°','Quadríceps',3,'8–12','2–3 min','1','Pés na largura dos ombros, um pouco mais baixos. Desça até o limite sem tirar o quadril do banco. Travas de segurança sempre posicionadas.'),
  pendular:E('Agachamento pendular','Quadríceps',3,'8–12','2–3 min','1','Desça fundo e controlado; os joelhos podem passar a ponta dos pés. Sem quicar no fundo.'),
  extensora:E('Cadeira extensora','Quadríceps',3,'10–15','90 s','0','Encosto o mais reclinado possível: com o quadril mais estendido o reto femoral trabalha alongado. Segure 1 s no topo; parciais na metade inferior após a falha.'),
  extUni:E('Cadeira extensora unilateral','Quadríceps',2,'12–15 cada perna','90 s','0','Encosto reclinado, joelho alinhado ao eixo da máquina e pelve firme. Sem chutar.'),
  flexSent:E('Cadeira flexora sentada','Posteriores',3,'8–12','2 min','0–1','Tronco inclinado à frente e quadril preso: posteriores alongados no quadril, o que gerou mais hipertrofia que a flexora deitada. Volte controlando até estender totalmente.'),
  mesaFlex:E('Mesa flexora','Posteriores',3,'10–15','90 s','0–1','Quadril colado ao banco. Aperte no topo e volte controlando até estender totalmente.'),
  flexPe:E('Flexora em pé unilateral','Posteriores',3,'10–15 cada perna','60–90 s','0–1','Quadril parado e tronco levemente à frente. Última série de cada lado até a falha técnica.'),
  adutora:E('Cadeira adutora','Adutores',3,'10–15','90 s','0–1','Abra até um alongamento profundo e confortável; feche sem bater os pesos. Tronco levemente à frente aumenta o alongamento.'),
  pantPe:E('Panturrilha em pé na máquina','Panturrilhas',4,'8–12','60–90 s','0–1','Pausa de 2 s no alongamento máximo e subida sem quicar. Após a falha, faça parciais na metade inferior (alongada).'),
  pantLP:E('Panturrilha no leg press','Panturrilhas',3,'10–15','60–90 s','0–1','Joelhos estendidos, só o tornozelo trabalha. Desça ao máximo; parciais alongadas na última série.'),
  pantSent:E('Panturrilha sentada','Panturrilhas',2,'12–20','60–90 s','0–1','Amplitude total com pausa embaixo. Complemento para o sóleo — a panturrilha em pé deu mais hipertrofia total, por isso vem primeiro na semana.'),
  abdCabo:E('Abdominal no cabo','Abdômen',3,'10–15','60–90 s','1','Ajoelhado, enrole a coluna levando as costelas em direção à pelve; o quadril não se move. Alongue em cima.')
};

const alternatives={
  'Supino inclinado no Smith':'Supino inclinado na máquina articulada',
  'Chest press convergente':'Supino reto no Smith',
  'Crucifixo no cabo (polia média)':'Peck deck',
  'Supino inclinado convergente':'Supino inclinado com halteres',
  'Peck deck':'Crucifixo no cabo (polia média)',
  'Elevação lateral unilateral no cabo':'Elevação lateral na máquina',
  'Elevação lateral na máquina':'Elevação lateral com halter deitado inclinado',
  'Crucifixo inverso na máquina':'Crucifixo inverso no cabo cruzado',
  'Tríceps francês no cabo':'Tríceps francês com halter',
  'Tríceps na barra V':'Tríceps com corda na polia',
  'Tríceps corda acima da cabeça':'Tríceps francês na máquina',
  'Puxada alta com pegada neutra':'Barra fixa neutra assistida',
  'Remada articulada com peito apoiado':'Remada cavalinho com peito apoiado',
  'Puxada unilateral no cabo':'Pulldown com braços estendidos',
  'Remada baixa neutra no cabo':'Remada articulada baixa',
  'Pullover no cabo':'Pullover na máquina',
  'Encolhimento na máquina':'Encolhimento no Smith',
  'Rosca inclinada com halteres':'Rosca Bayesian no cabo',
  'Rosca Scott na máquina':'Rosca Scott com barra W',
  'Rosca Bayesian no cabo':'Rosca inclinada com halteres',
  'Hack squat':'Agachamento pendular',
  'Leg press 45°':'Leg press horizontal',
  'Agachamento pendular':'Agachamento no Smith com pés à frente',
  'Cadeira extensora':'Sissy squat assistido',
  'Cadeira extensora unilateral':'Cadeira extensora bilateral',
  'Cadeira flexora sentada':'Flexora sentada unilateral',
  'Mesa flexora':'Flexora deslizante com discos',
  'Flexora em pé unilateral':'Flexão de joelho no cabo com tornozeleira',
  'Cadeira adutora':'Adução de quadril no cabo em pé',
  'Panturrilha em pé na máquina':'Panturrilha no Smith em degrau',
  'Panturrilha no leg press':'Panturrilha donkey na máquina',
  'Panturrilha sentada':'Panturrilha sentada com anilha nos joelhos',
  'Abdominal no cabo':'Abdominal na máquina'
};

const warmups={
  'Supino inclinado no Smith':{group:'Peito',protocol:'2–3 séries progressivas: 10 reps com ~50%, 5 reps com ~70% e 2–3 reps com ~85% da carga de trabalho.'},
  'Supino inclinado convergente':{group:'Peito',protocol:'2–3 séries progressivas: 10 reps com ~50%, 5 reps com ~70% e 2–3 reps com ~85% da carga de trabalho.'},
  'Puxada alta com pegada neutra':{group:'Costas',protocol:'2 séries progressivas: 10 reps com ~50% e 4–5 reps com ~75% da carga de trabalho.'},
  'Remada articulada com peito apoiado':{group:'Costas',protocol:'1–2 séries progressivas: 10 reps leves e 5 reps com ~70% da carga.'},
  'Remada baixa neutra no cabo':{group:'Costas',protocol:'1–2 séries progressivas: 10 reps leves e 5 reps com ~70% da carga.'},
  'Hack squat':{group:'Quadríceps',protocol:'3 séries progressivas: 10 reps com ~40%, 6 reps com ~60% e 3 reps com ~80% da carga de trabalho.'},
  'Leg press 45°':{group:'Quadríceps',protocol:'2–3 séries progressivas: 12 reps leves, 6 reps moderadas e 3 reps com ~80% da carga.'},
  'Agachamento pendular':{group:'Quadríceps',protocol:'2 séries progressivas: 10 reps leves e 5 reps com ~75% da carga.'},
  'Cadeira flexora sentada':{group:'Posteriores',protocol:'2 séries progressivas: 12 reps leves e 6 reps moderadas, longe da falha.'},
  'Elevação lateral unilateral no cabo':{group:'Ombros',protocol:'1 série leve de 15 reps por lado, sem chegar perto da falha.'},
  'Elevação lateral na máquina':{group:'Ombros',protocol:'1 série leve de 15 reps, sem chegar perto da falha.'},
  'Tríceps francês no cabo':{group:'Tríceps',protocol:'1 série de 12 reps leves. Os supinos já aqueceram o tríceps.'},
  'Rosca inclinada com halteres':{group:'Bíceps',protocol:'1 série de 12 reps leves. As puxadas já aqueceram os flexores do cotovelo.'},
  'Panturrilha em pé na máquina':{group:'Panturrilhas',protocol:'1–2 séries leves de 12–15 reps com amplitude máxima.'},
  'Cadeira adutora':{group:'Adutores',protocol:'1 série leve de 15 reps em amplitude confortável.'}
};

const off=(day,short,title='Descanso')=>({short,day,title,subtitle:'Descanso completo. É aqui que o estímulo vira músculo.',exercises:[]});

// ── SEMANA A · 5 dias (Push · Pernas A · Pull · OFF · Pernas B · Upper · OFF)
const pushDay={short:'SEG',day:'SEGUNDA-FEIRA',title:'Push — peito, ombros e tríceps',subtitle:'9 séries de peito por sessão: acima de ~10 o retorno por série cai bastante. O resto do volume vai para o sábado.',exercises:[
  L.supIncSmith,L.chestPress,L.cruzCabo,X(L.latCabo,4),L.tricFrances,L.tricV]};
const legsA={short:'TER',day:'TERÇA-FEIRA',title:'Pernas A — quadríceps',subtitle:'Agachamentos profundos em máquina, extensora reclinada e flexora sentada. Lombar protegida, sem exercício específico de glúteos.',exercises:[
  L.hack,L.legPress,L.extensora,L.flexSent,X(L.adutora,2),L.pantPe,L.abdCabo]};
const pullDay={short:'QUA',day:'QUARTA-FEIRA',title:'Pull — costas, bíceps e posteriores de ombro',subtitle:'Puxadas e remadas com peito apoiado. Trapézio enxuto: as remadas já entregam metade do estímulo.',exercises:[
  L.puxNeutra,L.remArt,L.puxUni,L.cruzInv,L.encMaq,L.roscaInc,L.roscaScott,L.latMaq]};
const legsB={short:'SEX',day:'SEXTA-FEIRA',title:'Pernas B — posteriores',subtitle:'Posteriores em posição alongada, segundo estímulo de quadríceps e panturrilhas — sem stiff, hip thrust ou passada.',exercises:[
  X(L.flexSent,4),L.flexPe,L.pendular,L.extUni,X(L.adutora,2),L.pantLP,L.pantSent,X(L.abdCabo,2)]};
const upperDay={short:'SÁB',day:'SÁBADO',title:'Upper — segundo estímulo',subtitle:'Peito, costas, ombros e braços pela segunda vez na semana, com exercícios complementares aos de segunda e quarta.',exercises:[
  L.supIncConv,L.peckDeck,L.remBaixa,X(L.pullover,2),L.latCabo,X(L.cruzInv,2),L.roscaBayes,L.tricCorda]};
const planA={
  segunda:pushDay,terca:legsA,quarta:pullDay,quinta:off('QUINTA-FEIRA','QUI'),
  sexta:legsB,sabado:upperDay,domingo:off('DOMINGO','DOM')
};

// ── UPPER/LOWER · 4 dias (pernas 2×)
const planUL={
  segunda:{short:'SEG',day:'SEGUNDA-FEIRA',title:'Upper A — peito dominante',subtitle:'Empurrar e puxar no mesmo dia, com prioridade para o peito.',exercises:[
    L.supIncSmith,L.puxNeutra,L.chestPress,L.remArt,X(L.latCabo,4),L.tricFrances,L.roscaInc]},
  terca:{...legsA,short:'TER',day:'TERÇA-FEIRA',title:'Lower A — quadríceps'},
  quarta:off('QUARTA-FEIRA','QUA','Descanso estratégico'),
  quinta:{short:'QUI',day:'QUINTA-FEIRA',title:'Upper B — costas dominante',subtitle:'Segundo estímulo de superiores, com prioridade para as costas e braços.',exercises:[
    L.remBaixa,L.supIncConv,X(L.pullover,2),L.peckDeck,X(L.latMaq,4),X(L.cruzInv,2),L.roscaBayes,L.tricCorda]},
  sexta:{...legsB,short:'SEX',day:'SEXTA-FEIRA',title:'Lower B — posteriores'},
  sabado:off('SÁBADO','SÁB'),domingo:off('DOMINGO','DOM')
};

// ── PPL + UPPER · 4 dias (pernas 1×)
const planPPLU={
  segunda:pushDay,
  terca:{...pullDay,short:'TER',day:'TERÇA-FEIRA'},
  quarta:off('QUARTA-FEIRA','QUA','Descanso estratégico'),
  quinta:{short:'QUI',day:'QUINTA-FEIRA',title:'Pernas completas',subtitle:'Único treino de pernas da semana: concentrado, mas sem passar de ~9 séries por músculo na sessão.',exercises:[
    L.hack,L.legPress,L.extensora,X(L.flexSent,4),L.mesaFlex,X(L.adutora,2),L.pantPe,L.pantSent]},
  sexta:{...upperDay,short:'SEX',day:'SEXTA-FEIRA'},
  sabado:off('SÁBADO','SÁB'),domingo:off('DOMINGO','DOM')
};

// ── FULL BODY · 3 dias
const planFB={
  segunda:{short:'SEG',day:'SEGUNDA-FEIRA',title:'Full body A',subtitle:'Corpo inteiro com frequência 3× — eficiente para quem tem pouco tempo.',exercises:[
    L.hack,L.supIncSmith,L.puxNeutra,L.flexSent,L.latCabo,X(L.tricFrances,2),X(L.roscaInc,2),L.pantPe]},
  terca:off('TERÇA-FEIRA','TER'),
  quarta:{short:'QUA',day:'QUARTA-FEIRA',title:'Full body B',subtitle:'Variações complementares: máquinas convergentes e mesa flexora.',exercises:[
    L.legPress,L.remArt,L.chestPress,L.mesaFlex,X(L.cruzInv,2),X(L.latMaq,2),X(L.roscaScott,2),X(L.tricV,2),X(L.abdCabo,2)]},
  quinta:off('QUINTA-FEIRA','QUI'),
  sexta:{short:'SEX',day:'SEXTA-FEIRA',title:'Full body C',subtitle:'Ênfase em posições alongadas para fechar a semana.',exercises:[
    L.pendular,L.supIncConv,L.remBaixa,L.flexPe,X(L.adutora,2),L.latCabo,X(L.roscaBayes,2),X(L.tricCorda,2),L.pantSent]},
  sabado:off('SÁBADO','SÁB'),domingo:off('DOMINGO','DOM')
};

// ── PPL 6 DIAS (enhanced · evidência-based)
// Princípios: 2× por músculo, ≥48h entre estímulos, volume direto controlado
// Volume semanal direto atualizado (v3):
//   Ombro lateral: Seg (cabo 3s + inclinado 2s) + Qui (máquina 3s + cabo 3s) = 11s diretas
//   Tríceps:       Seg (francês 3s + supinado 2s) + Qui (corda 3s + barraV 2s) = 10s diretas
//   Bíceps:        Ter (inclinada 3s + Scott 2s) + Sex (Bayesian 3s + Scott 2s) = 10s diretas
//   Peito:         Seg (3+3+3) + Qui (3+3) = 15s diretas
//   Costas:        Ter (3+3) + Sex (3+3+2) = 14s diretas
//
// Mapa de intervalos (todos ≥72h):
//   Peito:     Seg → Qui ✓   Costas:  Ter → Sex ✓   Pernas: Qua → Sáb ✓
//   Ombro lat: Seg → Qui ✓   Tríceps: Seg → Qui ✓   Bíceps: Ter → Sex ✓

const ppl6_pushA={
  short:'SEG',day:'SEGUNDA-FEIRA',
  title:'Push A — peito + ombro lateral + tríceps',
  subtitle:'Peito com 3 exercícios. Ombro lateral: cabo (3s) + deitado inclinado (2s) = máximo alongamento. Tríceps: francês cabeça longa (3s) + pushdown supinado cabeça lateral (2s) — cobertura total das 3 cabeças.',
  exercises:[
    L.supIncSmith,         // Peito 3s — composto principal
    L.chestPress,          // Peito 3s
    L.cruzCabo,            // Peito 3s — isolador alongado
    X(L.latCabo,3),        // Ombro lateral 3s — posição alongada no cabo
    X(L.latInclinado,2),   // Ombro lateral 2s — MAX alongamento (novo)
    X(L.tricFrances,3),    // Tríceps 3s — cabeça longa (acima da cabeça)
    X(L.tricSupinado,2),   // Tríceps 2s — cabeça lateral (pushdown supinado, novo)
  ]
};

const ppl6_pullA={
  short:'TER',day:'TERÇA-FEIRA',
  title:'Pull A — costas + ombro posterior + bíceps',
  subtitle:'Costas com 3 exercícios. Ombro posterior 2s diretas. Bíceps: rosca inclinada alongada (3s) + Scott máquina encurtado (2s) — cobertura dos dois extremos da curva de força.',
  exercises:[
    L.puxNeutra,         // Costas 3s — composto principal
    L.remArt,            // Costas 3s
    X(L.cruzInv,2),      // Ombro posterior 2s diretas
    L.encMaq,            // Trapézio 3s
    X(L.roscaInc,3),     // Bíceps 3s — posição alongada (banco 45°)
    X(L.roscaScott,2),   // Bíceps 2s — posição encurtada/pico (novo)
  ]
};

const ppl6_legsA={
  short:'QUA',day:'QUARTA-FEIRA',
  title:'Legs A — quadríceps + adutores + panturrilha',
  subtitle:'Quad como prioridade: Hack fundo + Leg press + Extensora reclinada. Adutores e panturrilha completam. Sem posteriores — recuperam para sábado.',
  exercises:[
    L.hack,              // Quad 3s
    L.legPress,          // Quad 3s
    X(L.extensora,3),    // Quad 3s — posição alongada
    X(L.adutora,2),      // Adutores 2s
    X(L.pantPe,3),       // Panturrilha 3s
    L.abdCabo,           // Abdômen 3s
  ]
};

const ppl6_pushB={
  short:'QUI',day:'QUINTA-FEIRA',
  title:'Push B — peito superior + ombro + tríceps',
  subtitle:'Segundo estímulo de peito. Ombro lateral: máquina (3s) + cabo unilateral (3s) = 72h desde seg ✓. Tríceps: corda acima da cabeça (3s) + barra V finalizador (2s).',
  exercises:[
    L.supIncConv,        // Peito superior 3s
    L.peckDeck,          // Peito 3s — isolador
    X(L.latMaq,3),       // Ombro lateral 3s — máquina, 72h desde seg ✓
    X(L.latCabo,3),      // Ombro lateral 3s — cabo unilateral (novo, 72h ✓)
    X(L.tricCorda,3),    // Tríceps 3s — cabeça longa acima da cabeça
    X(L.tricV,2),        // Tríceps 2s — finalizador
  ]
};

const ppl6_pullB={
  short:'SEX',day:'SEXTA-FEIRA',
  title:'Pull B — costas + bíceps',
  subtitle:'Segundo estímulo de costas. Bíceps: Bayesian alongado (3s) + Scott máquina encurtado (2s) = cobertura completa da curva de força. 72h desde ter ✓.',
  exercises:[
    L.remBaixa,          // Costas 3s
    X(L.pullover,3),     // Costas 3s — grande dorsal em alongamento
    L.puxUni,            // Costas 2s — unilateral
    X(L.roscaBayes,3),   // Bíceps 3s — posição alongada (Bayesian)
    X(L.roscaScott,2),   // Bíceps 2s — posição encurtada/pico (novo, 72h ✓)
  ]
};

const ppl6_legsB={
  short:'SÁB',day:'SÁBADO',
  title:'Legs B — posteriores + quadríceps + panturrilha',
  subtitle:'Posteriores como prioridade: flexora sentada (posição alongada) + flexora em pé + mesa flexora. Segundo estímulo de quad com pendular e extensora unilateral. 72h desde qua para todos os grupos ✓',
  exercises:[
    X(L.flexSent,4),     // Post 4s — posição alongada, prioridade
    L.flexPe,            // Post 3s — unilateral
    L.mesaFlex,          // Post 3s
    L.pendular,          // Quad 3s
    L.extUni,            // Quad 2s
    X(L.adutora,2),      // Adutores 2s
    L.pantLP,            // Panturrilha 3s
    L.pantSent,          // Panturrilha sóleo 2s
    X(L.abdCabo,2),      // Abdômen 2s
  ]
};

const planPPL6={
  segunda:ppl6_pushA,terca:ppl6_pullA,quarta:ppl6_legsA,
  quinta:ppl6_pushB,sexta:ppl6_pullB,sabado:ppl6_legsB,
  domingo:off('DOMINGO','DOM','Descanso — recuperação ativa')
};

const schedules={
  ppl6x:{plan:planPPL6,description:'PPL 6 dias: Push A · Pull A · Legs A · Push B · Pull B · Legs B. Cada músculo 2× · 20–30 séries/semana · indicado para usuários de hormônios.'},
  padrao:{plan:planA,description:'Push · Pernas A · Pull · descanso · Pernas B · Upper · descanso. Cada músculo 2× na semana, maior volume total.'},
  pernas2x:{plan:planUL,description:'Upper A · Lower A · descanso · Upper B · Lower B. Tudo 2× na semana com 4 sessões.'},
  pernas1x:{plan:planPPLU,description:'Push · Pull · descanso · Pernas · Upper. Superiores 2×, pernas 1× — escolha se prioriza o tronco.'},
  fullbody:{plan:planFB,description:'Full body na segunda, quarta e sexta. Menos volume por músculo, mas frequência 3× e sessões curtas.'}
};

const MUSCLES=['Peito','Costas','Ombro lateral','Ombro posterior','Tríceps','Bíceps','Trapézio','Quadríceps','Posteriores','Adutores','Panturrilhas','Abdômen'];
const order=['segunda','terca','quarta','quinta','sexta','sabado','domingo'];
const storageKey='hipertrofia-insana-v2';
const logKey='hipertrofia-insana-v2-cargas';
const scheduleKey='hipertrofia-insana-v2-schedule';

function load(key,fallback){try{return JSON.parse(localStorage.getItem(key))||fallback}catch{return fallback}}
function store(key,value){try{localStorage.setItem(key,typeof value==='string'?value:JSON.stringify(value))}catch{}}

let state=load(storageKey,{});
let logs=load(logKey,{});
let scheduleMode=(()=>{try{return localStorage.getItem(scheduleKey)}catch{return null}})();
if(!schedules[scheduleMode])scheduleMode='padrao';
let active=getTodayKey();

function getTodayKey(){return ['domingo','segunda','terca','quarta','quinta','sexta','sabado'][new Date().getDay()]}
function currentPlan(){return schedules[scheduleMode].plan}
function sessionKey(day,index){return `${scheduleMode}-${day}-${index}`}
function googleImagesUrl(name){return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(name+' exercício musculação execução correta')}`}
function fmt(n){return Number.isInteger(n)?String(n):n.toFixed(1).replace('.',',')}
function restSeconds(rest){const nums=rest.match(/\d+/g).map(Number),max=Math.max(...nums);return /min/.test(rest)?max*60:max}

function volume(exercises){
  const v={};
  exercises.forEach(e=>{
    v[e.muscle]=(v[e.muscle]||0)+e.sets;
    Object.entries(secondary[e.name]||{}).forEach(([m,f])=>v[m]=(v[m]||0)+e.sets*f);
  });
  return v;
}
function weeklyVolume(){return volume(order.flatMap(k=>currentPlan()[k].exercises))}
function zone(sets){return sets<8?'low':sets<=20?'good':'high'}

function renderScheduleTabs(){
  document.querySelectorAll('[data-schedule]').forEach(b=>{const sel=b.dataset.schedule===scheduleMode;b.classList.toggle('active',sel);b.setAttribute('aria-selected',sel)});
  document.getElementById('scheduleDescription').textContent=schedules[scheduleMode].description;
  const v=weeklyVolume();
  document.getElementById('weeklySummary').innerHTML=MUSCLES.filter(m=>v[m]).map(m=>`<span class="muscle-pill zone-${zone(v[m])}"><b>${m}</b> · ${fmt(v[m])}</span>`).join('');
}
function renderTabs(){
  const tabs=document.getElementById('dayTabs');tabs.innerHTML='';
  order.forEach(key=>{
    const d=currentPlan()[key],b=document.createElement('button');
    b.className=`day-tab ${key===active?'active':''}`;b.type='button';
    b.innerHTML=`<span>${d.short}</span><strong>${d.exercises.length?d.exercises.reduce((s,e)=>s+e.sets,0)+' séries':'OFF'}</strong>`;
    b.onclick=()=>{active=key;render()};tabs.appendChild(b);
  });
}
function linkIcon(){return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5M19 5l-8 8M18 13v6H5V6h6"/></svg>'}
function render(){
  renderScheduleTabs();renderTabs();
  const d=currentPlan()[active];
  document.getElementById('dayLabel').textContent=d.day;
  document.getElementById('sessionTitle').textContent=d.title;
  document.getElementById('sessionSubtitle').textContent=d.subtitle;
  const list=document.getElementById('exerciseList');list.innerHTML='';
  const direct={};d.exercises.forEach(e=>direct[e.muscle]=(direct[e.muscle]||0)+e.sets);
  document.getElementById('muscleSummary').innerHTML=Object.entries(direct).map(([m,s])=>`<span class="muscle-pill"><b>${m}</b> · ${s} séries</span>`).join('');
  d.exercises.forEach((e,i)=>{
    const checked=!!state[sessionKey(active,i)],alt=alternatives[e.name],warm=warmups[e.name],log=logs[e.name]||{},row=document.createElement('article');
    row.className=`exercise ${checked?'done':''}`;
    row.innerHTML=`<div class="exercise-index">${String(i+1).padStart(2,'0')}</div>
      <div><span class="exercise-muscle">${e.muscle}</span><a class="exercise-name" href="${googleImagesUrl(e.name)}" target="_blank" rel="noopener noreferrer" title="Ver imagens de ${e.name}">${e.name}${linkIcon()}</a></div>
      <div class="exercise-meta"><div><small>Séries</small><b>${e.sets}</b></div><div><small>Reps</small><b>${e.reps}</b></div><div><small>Descanso</small><b>${e.rest}</b></div><div><small>Esforço</small><b>RIR ${e.rir}</b></div></div>
      <input class="check" type="checkbox" ${checked?'checked':''} aria-label="Marcar ${e.name} como concluído">
      ${warm?`<div class="warmup"><span>AQUECIMENTO · ${warm.group}</span><p>${warm.protocol}</p><small>Não conta como série efetiva e nunca chega perto da falha.</small></div>`:''}
      <div class="technique"><b>Execução:</b> ${e.technique}</div>
      <div class="tracker">
        <label><small>Carga (kg)</small><input type="number" inputmode="decimal" min="0" step="0.5" data-field="kg" value="${log.kg??''}" placeholder="—"></label>
        <label><small>Reps (1ª série)</small><input type="number" inputmode="numeric" min="0" step="1" data-field="reps" value="${log.reps??''}" placeholder="—"></label>
        <p class="tracker-hint">${progressHint(e,log)}</p>
        <button type="button" class="timer-btn" data-rest="${restSeconds(e.rest)}"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9 2h6"/></svg>${e.rest}</button>
      </div>
      ${alt?`<div class="alternative"><span>PLANO B</span><div><a href="${googleImagesUrl(alt)}" target="_blank" rel="noopener noreferrer" title="Ver imagens de ${alt}">${alt}${linkIcon()}</a><small>Mesma configuração: ${e.sets} séries · ${e.reps} reps · ${e.rest} · RIR ${e.rir}</small></div></div>`:''}`;
    row.querySelector('.check').onchange=ev=>{state[sessionKey(active,i)]=ev.target.checked;store(storageKey,state);renderSessionProgress();row.classList.toggle('done',ev.target.checked)};
    row.querySelectorAll('[data-field]').forEach(inp=>inp.oninput=()=>{
      const entry=logs[e.name]||(logs[e.name]={});
      entry[inp.dataset.field]=inp.value===''?undefined:Number(inp.value);
      store(logKey,logs);row.querySelector('.tracker-hint').textContent=progressHint(e,entry);
    });
    row.querySelector('.timer-btn').onclick=ev=>startTimer(Number(ev.currentTarget.dataset.rest),e.name);
    list.appendChild(row);
  });
  document.getElementById('intensityNote').style.display=d.exercises.length?'flex':'none';
  if(!d.exercises.length)list.innerHTML='<div class="rest-card"><strong>DESCANSO TOTAL</strong><p>Caminhada leve opcional, proteína distribuída nas refeições e 7–9 h de sono. Não “compense” o treino perdido dobrando volume amanhã.</p></div>';
  document.getElementById('weekVolume').textContent=`${d.exercises.reduce((s,e)=>s+e.sets,0)} séries programadas`;
  renderSessionProgress();
}
function progressHint(e,log){
  if(log.reps==null||log.kg==null)return 'Registre carga e reps da 1ª série para guiar a progressão.';
  const top=Math.max(...e.reps.match(/\d+/g).map(Number).slice(0,2));
  if(log.reps>=top)return `Topo da faixa atingido → próxima sessão: ~${fmt(Math.round(log.kg*1.04*2)/2)} kg.`;
  return `Meta: ${log.kg} kg × ${log.reps+1} reps (até ${top}).`;
}
function renderSessionProgress(){
  const d=currentPlan()[active],done=d.exercises.filter((_,i)=>state[sessionKey(active,i)]).length,p=d.exercises.length?Math.round(done/d.exercises.length*100):100;
  document.getElementById('progressText').textContent=`${p}%`;document.getElementById('progressBar').style.width=`${p}%`;
}

// ── Cronômetro de descanso
let timerId=null,timerEnd=0;
function startTimer(seconds,label){
  clearInterval(timerId);timerEnd=Date.now()+seconds*1000;
  const box=document.getElementById('restTimer');box.classList.add('show');
  document.getElementById('timerLabel').textContent=label;
  const tick=()=>{
    const left=Math.max(0,Math.round((timerEnd-Date.now())/1000));
    document.getElementById('timerValue').textContent=`${Math.floor(left/60)}:${String(left%60).padStart(2,'0')}`;
    document.getElementById('timerBar').style.width=`${left/seconds*100}%`;
    if(left===0){clearInterval(timerId);box.classList.add('finished');beep();if(navigator.vibrate)navigator.vibrate([200,100,200]);document.getElementById('timerValue').textContent='VAI!'}
  };
  box.classList.remove('finished');tick();timerId=setInterval(tick,250);
}
function stopTimer(){clearInterval(timerId);document.getElementById('restTimer').classList.remove('show','finished')}
function beep(){try{const c=new (window.AudioContext||window.webkitAudioContext)(),o=c.createOscillator(),g=c.createGain();o.frequency.value=880;o.connect(g);g.connect(c.destination);g.gain.setValueAtTime(.2,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.6);o.start();o.stop(c.currentTime+.6)}catch{}}
document.getElementById('timerAdd').onclick=()=>{timerEnd+=30000};
document.getElementById('timerClose').onclick=stopTimer;

document.querySelectorAll('[data-schedule]').forEach(b=>b.onclick=()=>{
  scheduleMode=b.dataset.schedule;store(scheduleKey,scheduleMode);render();showToast(`${b.querySelector('span').textContent} ativado`);
});
document.getElementById('resetButton').onclick=()=>{
  currentPlan()[active].exercises.forEach((_,i)=>delete state[sessionKey(active,i)]);store(storageKey,state);render();showToast('Checklist do dia reiniciado (cargas mantidas)');
};
function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}
render();

// ── DIETA
let dietOpen = false;
function toggleDiet() {
  dietOpen = !dietOpen;
  const sec = document.getElementById('dietSection');
  const btn = document.getElementById('navDietBtn');
  if (dietOpen) {
    sec.style.display = 'block';
    btn.classList.add('active');
    sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    sec.style.display = 'none';
    btn.classList.remove('active');
    document.getElementById('top').scrollIntoView({ behavior: 'smooth' });
  }
}

function toggleDietSubs(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('open');
  const btn = el.previousElementSibling;
  if (btn && btn.classList.contains('sub-toggle')) {
    btn.textContent = el.classList.contains('open') ? 'fechar' : 'trocar';
  }
}
