export type Locale = "ro" | "ru";
export const LOCALES: readonly Locale[] = ["ro", "ru"] as const;
export const DEFAULT_LOCALE: Locale = "ro";

/** A string available in every supported language. */
export type L10n = Record<Locale, string>;

export type SectionId =
  | "recruitment"
  | "vacancy_evp"
  | "candidate_experience"
  | "interview_selection"
  | "onboarding"
  | "retention"
  | "hr_analytics";

export type AnswerValue = 0 | 1 | 2;

export interface Question {
  /** Stable ID, never reuse or renumber: q<section>_<n>. */
  id: string;
  /** Number as printed in the source, e.g. "3.1". */
  number: string;
  sectionId: SectionId;
  text: L10n;
  /** Internal editorial flag; not shown to respondents. */
  editorialNote?: string;
}

export interface GrowthAction {
  /** Stable ID: a<section>_<n>. */
  id: string;
  text: L10n;
  /**
   * App-side deterministic mapping (not from the source) used only to order the
   * three canonical actions by the respondent's weak answers.
   */
  addressesQuestions: string[];
}

export interface Section {
  id: SectionId;
  number: number;
  title: L10n;
  /** Guiding question shown under the section title. */
  prompt: L10n;
  questions: Question[];
  growth: {
    meaning: L10n;
    actions: GrowthAction[];
    next: L10n;
    /** Source next step mentions Jobber as an extra channel. */
    mentionsJobber: boolean;
  };
  /** App suggestion for the 30-day plan metric. NOT part of the source. */
  suggestedMetric: L10n;
}

export type LevelId = "needs_systematization" | "basic" | "mature" | "strategic";

export interface Level {
  id: LevelId;
  min: number;
  max: number;
  title: L10n;
  description: L10n;
}
/**
 * Canonical audit content.
 * Source: owner's Russian PDF/PNG transcription (canonical). Romanian is a translation.
 * Never invent questions, actions or thresholds here — change only with owner approval.
 */
export const ANSWER_OPTIONS: { value: AnswerValue; label: L10n }[] = [
  { value: 0, label: { ru: "Нет / не делаем", ro: "Nu facem" } },
  { value: 1, label: { ru: "Делаем частично или несистемно", ro: "Facem parțial sau nesistematic" } },
  { value: 2, label: { ru: "Делаем регулярно и системно", ro: "Facem regulat" } },
];

export const ANSWER_INSTRUCTION: L10n = {
  ru: "Отвечайте исходя из текущей реальности, а не из идеальной ситуации.",
  ro: "Răspundeți pornind de la situația reală de acum, nu de la cea ideală.",
};

export const SECTION_MAX = 10;
export const TOTAL_MAX = 70;

export const SECTIONS: Section[] = [
  {
    id: "recruitment",
    number: 1,
    title: { ru: "Набор персонала", ro: "Recrutarea personalului" },
    prompt: {
      ru: "Насколько системно вы находите и нанимаете сотрудников?",
      ro: "Cât de sistematic găsiți și angajați oameni?",
    },
    questions: [
      { id: "q1_1", number: "1.1", sectionId: "recruitment", text: { ru: "Перед началом поиска мы чётко определяем, какого кандидата хотим найти.", ro: "Înainte de a începe căutarea, stabilim clar ce fel de candidat dorim să găsim." } },
      { id: "q1_2", number: "1.2", sectionId: "recruitment", text: { ru: "HR и руководитель заранее согласовывают требования к кандидату.", ro: "HR-ul și managerul stabilesc de comun acord cerințele pentru candidați înainte de începerea recrutării." } },
      { id: "q1_3", number: "1.3", sectionId: "recruitment", text: { ru: "У нас есть понятный процесс от открытия вакансии до принятия решения о найме.", ro: "Avem un proces clar, de la deschiderea postului vacant până la decizia de angajare." } },
      { id: "q1_4", number: "1.4", sectionId: "recruitment", text: { ru: "Мы понимаем, какие каналы поиска дают нам подходящих кандидатов.", ro: "Înțelegem ce canale de căutare ne aduc candidați potriviți." } },
      { id: "q1_5", number: "1.5", sectionId: "recruitment", text: { ru: "После закрытия вакансии мы анализируем, что сработало, а что нет.", ro: "După închiderea postului vacant, analizăm ce a funcționat și ce nu." } },
    ],
    growth: {
      meaning: {
        ru: "Поиск сотрудников зависит от конкретного HR или руководителя. Нет единого процесса, сложно оценить эффективность каналов, а каждый новый поиск может начинаться практически с нуля.",
        ro: "Căutarea angajaților depinde de un anumit specialist HR sau de un anumit manager. Nu există un proces unic, eficiența canalelor este greu de evaluat, iar fiecare nouă căutare poate începe practic de la zero.",
      },
      actions: [
        { id: "a1_1", addressesQuestions: ["q1_1", "q1_2"], text: { ru: "Для каждой открытой вакансии заранее зафиксировать профиль кандидата и 3–5 обязательных критериев.", ro: "Pentru fiecare post vacant deschis, stabiliți din timp profilul candidatului și 3–5 criterii obligatorii." } },
        { id: "a1_2", addressesQuestions: ["q1_3"], text: { ru: "Описать единый путь вакансии: открытие → поиск → отбор → интервью → решение.", ro: "Descrieți un parcurs unic al postului vacant: deschidere → căutare → selecție → interviu → decizie." } },
        { id: "a1_3", addressesQuestions: ["q1_4", "q1_5"], text: { ru: "Для следующей вакансии фиксировать источник каждого кандидата и результат по нему.", ro: "Pentru următorul post vacant, înregistrați sursa fiecărui candidat și rezultatul obținut din ea." } },
      ],
      next: {
        ru: "Jobber как дополнительный канал поиска, не перестраивать всё сразу.",
        ro: "Jobber ca un canal suplimentar de căutare, fără a reconstrui totul dintr-odată.",
      },
      mentionsJobber: true,
    },
    suggestedMetric: {
      ru: "Доля подходящих кандидатов по каждому каналу поиска и срок закрытия вакансии.",
      ro: "Ponderea candidaților potriviți pe fiecare canal de căutare și termenul de închidere a postului.",
    },
  },
  {
    id: "vacancy_evp",
    number: 2,
    title: { ru: "Вакансия и EVP", ro: "Anunțul de angajare și EVP" },
    prompt: {
      ru: "Понимает ли кандидат, почему ему стоит откликнуться именно на вашу вакансию?",
      ro: "Înțelege candidatul de ce merită să aplice tocmai la postul dumneavoastră?",
    },
    questions: [
      { id: "q2_1", number: "2.1", sectionId: "vacancy_evp", text: { ru: "В вакансии понятно описано, чем сотрудник будет заниматься.", ro: "În anunț este descris clar cu ce se va ocupa angajatul." } },
      { id: "q2_2", number: "2.2", sectionId: "vacancy_evp", text: { ru: "Кандидат заранее понимает основные условия работы и уровень дохода.", ro: "Candidatul cunoaște din timp principalele condiții de muncă și nivelul veniturilor." } },
      { id: "q2_3", number: "2.3", sectionId: "vacancy_evp", text: { ru: "В вакансии понятно, что компания предлагает сотруднику помимо набора задач.", ro: "Din anunț reiese clar ce oferă compania angajatului, dincolo de lista de sarcini." } },
      { id: "q2_4", number: "2.4", sectionId: "vacancy_evp", text: { ru: "Описание вакансии соответствует реальной работе, а не универсальному шаблону.", ro: "Descrierea postului corespunde muncii reale, nu unui șablon universal." } },
      { id: "q2_5", number: "2.5", sectionId: "vacancy_evp", text: { ru: "Из вакансии понятно, почему потенциальному кандидату стоит выбрать именно нашу компанию.", ro: "Din anunț reiese clar de ce un potențial candidat ar trebui să aleagă tocmai compania noastră." } },
    ],
    growth: {
      meaning: {
        ru: "Кандидат может не понимать ценность предложения: чем он будет заниматься, что получит от компании и почему должен выбрать именно эту вакансию.",
        ro: "Este posibil ca candidatul să nu înțeleagă valoarea ofertei: cu ce se va ocupa, ce va primi de la companie și de ce ar trebui să aleagă tocmai acest post.",
      },
      actions: [
        { id: "a2_1", addressesQuestions: ["q2_1", "q2_2", "q2_3"], text: { ru: "Переписать одну актуальную вакансию с фокусом на задачи, условия и ценность для кандидата.", ro: "Rescrieți un anunț actual, punând accentul pe sarcini, condiții și valoarea pentru candidat." } },
        { id: "a2_2", addressesQuestions: ["q2_4"], text: { ru: "Убрать требования, которые не являются действительно обязательными.", ro: "Eliminați cerințele care nu sunt cu adevărat obligatorii." } },
        { id: "a2_3", addressesQuestions: ["q2_5"], text: { ru: "Проверить вакансию глазами кандидата: понятно ли ему, чем он будет заниматься, сколько заработает и почему стоит откликнуться?", ro: "Verificați anunțul prin ochii candidatului: înțelege cu ce se va ocupa, cât va câștiga și de ce merită să aplice?" } },
      ],
      next: {
        ru: "Сравнить количество и качество откликов после обновления; Jobber как дополнительный канал.",
        ro: "Comparați numărul și calitatea candidaturilor după actualizare; Jobber ca un canal suplimentar.",
      },
      mentionsJobber: true,
    },
    suggestedMetric: {
      ru: "Количество и доля релевантных откликов на обновлённую вакансию за 30 дней.",
      ro: "Numărul și ponderea candidaturilor relevante la anunțul actualizat în 30 de zile.",
    },
  },
  {
    id: "candidate_experience",
    number: 3,
    title: { ru: "Опыт кандидата", ro: "Experiența candidatului" },
    prompt: {
      ru: "Какой опыт получает кандидат во время найма?",
      ro: "Ce experiență are candidatul pe parcursul procesului de angajare?",
    },
    questions: [
      {
        id: "q3_1",
        number: "3.1",
        sectionId: "candidate_experience",
        // Editorial correction requested by owner: replace duplicate of 1.1.
        editorialNote: "Replaces duplicate 1.1; assesses ease and clarity of the application process.",
        text: { ru: "Мы проверяем, насколько понятен и удобен для кандидата процесс отклика на вакансию.", ro: "Verificăm cât de clar și de simplu este pentru candidat să aplice la un post vacant." },
      },
      { id: "q3_2", number: "3.2", sectionId: "candidate_experience", text: { ru: "Кандидат понимает, на каком этапе находится его кандидатура.", ro: "Candidatul știe în ce etapă se află candidatura sa." } },
      { id: "q3_3", number: "3.3", sectionId: "candidate_experience", text: { ru: "Перед интервью кандидат знает его формат, продолжительность и участников.", ro: "Înainte de interviu, candidatul îi cunoaște formatul, durata și participanții." } },
      { id: "q3_4", number: "3.4", sectionId: "candidate_experience", text: { ru: "Компания соблюдает обещанные сроки коммуникации.", ro: "Compania respectă termenele de comunicare promise." } },
      { id: "q3_5", number: "3.5", sectionId: "candidate_experience", text: { ru: "Даже при отказе кандидат получает корректную и профессиональную коммуникацию.", ro: "Chiar și în caz de refuz, candidatul primește o comunicare corectă și profesionistă." } },
    ],
    growth: {
      meaning: {
        ru: "Кандидаты могут теряться между откликом, интервью и принятием решения, даже если сама вакансия им подходит.",
        ro: "Candidații se pot pierde între aplicare, interviu și decizie, chiar dacă postul în sine li se potrivește.",
      },
      actions: [
        { id: "a3_1", addressesQuestions: ["q3_2", "q3_4"], text: { ru: "Зафиксировать стандартные сроки ответа кандидату после каждого этапа.", ro: "Stabiliți termene standard de răspuns pentru candidat după fiecare etapă." } },
        { id: "a3_2", addressesQuestions: ["q3_3", "q3_5"], text: { ru: "Сделать единый сценарий коммуникации: отклик → приглашение → интервью → решение. В случае отказа отправьте сообщение или электронное письмо либо позвоните и поблагодарите за отклик; если отказ последовал после собеседования, дайте краткую обратную связь и также поблагодарите за отклик.", ro: "Creați un scenariu unic de comunicare: aplicare → invitație → interviu → decizie. În caz de refuz, trimiteți un mesaj sau un e-mail ori sunați și mulțumiți pentru aplicare; dacă refuzul vine după interviu, oferiți un feedback scurt și mulțumiți, de asemenea, pentru aplicare." } },
        { id: "a3_3", addressesQuestions: ["q3_1"], text: { ru: "Проверить вакансию глазами кандидата: понятно ли ему, чем он будет заниматься, сколько заработает и почему стоит откликнуться?", ro: "Verificați anunțul prin ochii candidatului: înțelege cu ce se va ocupa, cât va câștiga și de ce merită să aplice?" } },
      ],
      next: {
        ru: "Сначала исправьте коммуникацию и процесс, затем при необходимости дополнительный канал поиска.",
        ro: "Mai întâi corectați comunicarea și procesul, apoi, dacă este necesar, un canal suplimentar de căutare.",
      },
      mentionsJobber: false,
    },
    suggestedMetric: {
      ru: "Доля кандидатов, получивших ответ в установленный срок после каждого этапа.",
      ro: "Ponderea candidaților care primesc răspuns în termenul stabilit după fiecare etapă.",
    },
  },
  {
    id: "interview_selection",
    number: 4,
    title: { ru: "Собеседование и отбор", ro: "Interviul și selecția" },
    prompt: {
      ru: "Насколько объективно вы принимаете решение о найме?",
      ro: "Cât de obiectiv luați decizia de angajare?",
    },
    questions: [
      { id: "q4_1", number: "4.1", sectionId: "interview_selection", text: { ru: "До интервью определены критерии, по которым будет оцениваться кандидат.", ro: "Înainte de interviu sunt stabilite criteriile după care va fi evaluat candidatul." } },
      { id: "q4_2", number: "4.2", sectionId: "interview_selection", text: { ru: "Интервью проходит по понятной структуре, а не полностью импровизированно.", ro: "Interviul urmează o structură clară și nu este complet improvizat." } },
      { id: "q4_3", number: "4.3", sectionId: "interview_selection", text: { ru: "Кандидатов на одну позицию можно сравнить по одинаковым критериям.", ro: "Candidații pentru aceeași poziție pot fi comparați după aceleași criterii." } },
      { id: "q4_4", number: "4.4", sectionId: "interview_selection", text: { ru: "Решение о найме основано на конкретных фактах и примерах из опыта кандидата.", ro: "Decizia de angajare se bazează pe fapte concrete și pe exemple din experiența candidatului." } },
      { id: "q4_5", number: "4.5", sectionId: "interview_selection", text: { ru: "HR и руководитель обсуждают кандидата на основании критериев, а не только общего впечатления.", ro: "HR-ul și managerul discută candidatul pe baza criteriilor, nu doar a impresiei generale." } },
    ],
    growth: {
      meaning: {
        ru: "Решение о найме может сильно зависеть от субъективного впечатления конкретного интервьюера. Это повышает риск как ошибочного найма, так и отказа подходящему кандидату.",
        ro: "Decizia de angajare poate depinde în mare măsură de impresia subiectivă a unui anumit intervievator. Acest lucru crește riscul atât al unei angajări greșite, cât și al refuzării unui candidat potrivit.",
      },
      actions: [
        { id: "a4_1", addressesQuestions: ["q4_1", "q4_3"], text: { ru: "Для одной приоритетной вакансии определить 4–6 критериев оценки.", ro: "Pentru un post vacant prioritar, stabiliți 4–6 criterii de evaluare." } },
        { id: "a4_2", addressesQuestions: ["q4_2"], text: { ru: "Подготовить одинаковую базовую структуру интервью для всех кандидатов.", ro: "Pregătiți aceeași structură de bază a interviului pentru toți candidații." } },
        { id: "a4_3", addressesQuestions: ["q4_4", "q4_5"], text: { ru: "После каждого интервью фиксировать оценку до обсуждения кандидата с другими участниками.", ro: "După fiecare interviu, consemnați evaluarea înainte de a discuta candidatul cu ceilalți participanți." } },
      ],
      next: {
        ru: "Провести следующие 3–5 интервью по новой структуре и сравнить качество решений.",
        ro: "Desfășurați următoarele 3–5 interviuri după noua structură și comparați calitatea deciziilor.",
      },
      mentionsJobber: false,
    },
    suggestedMetric: {
      ru: "Доля новых сотрудников, успешно прошедших испытательный срок.",
      ro: "Ponderea angajaților noi care trec cu succes perioada de probă.",
    },
  },
  {
    // Source recommendation page 14 was mislabeled; this content belongs to onboarding (section 5).
    id: "onboarding",
    number: 5,
    title: { ru: "Онбординг", ro: "Onboarding" },
    prompt: {
      ru: "Что происходит после того, как кандидат сказал «да»?",
      ro: "Ce se întâmplă după ce candidatul a spus „da”?",
    },
    questions: [
      { id: "q5_1", number: "5.1", sectionId: "onboarding", text: { ru: "До первого рабочего дня подготовлены рабочее место, доступы и необходимые материалы.", ro: "Până în prima zi de lucru sunt pregătite locul de muncă, accesele și materialele necesare." } },
      { id: "q5_2", number: "5.2", sectionId: "onboarding", text: { ru: "Новый сотрудник заранее понимает, что его ждёт в первый день.", ro: "Noul angajat știe din timp ce îl așteaptă în prima zi." } },
      { id: "q5_3", number: "5.3", sectionId: "onboarding", text: { ru: "У сотрудника есть конкретный человек, к которому он может обратиться с вопросами.", ro: "Angajatul are o persoană concretă căreia îi poate adresa întrebări." } },
      { id: "q5_4", number: "5.4", sectionId: "onboarding", text: { ru: "На испытательный срок определены понятные цели и ожидания.", ro: "Pentru perioada de probă sunt stabilite obiective și așteptări clare." } },
      { id: "q5_5", number: "5.5", sectionId: "onboarding", text: { ru: "Руководитель регулярно даёт обратную связь в период адаптации.", ro: "Managerul oferă regulat feedback în perioada de adaptare." } },
    ],
    growth: {
      meaning: {
        ru: "Компания тратит ресурсы на поиск и найм, но новый сотрудник не получает понятного старта после выхода.",
        ro: "Compania investește resurse în căutare și angajare, dar noul angajat nu primește un start clar după ce începe lucrul.",
      },
      actions: [
        { id: "a5_1", addressesQuestions: ["q5_1", "q5_2"], text: { ru: "Создать чек-лист подготовки к первому рабочему дню.", ro: "Creați o listă de verificare pentru pregătirea primei zile de lucru." } },
        { id: "a5_2", addressesQuestions: ["q5_4"], text: { ru: "Зафиксировать цели сотрудника на испытательный срок.", ro: "Stabiliți în scris obiectivele angajatului pentru perioada de probă." } },
        { id: "a5_3", addressesQuestions: ["q5_3", "q5_5"], text: { ru: "Назначить регулярные точки обратной связи с руководителем в первый месяц.", ro: "Programați întâlniri regulate de feedback cu managerul în prima lună." } },
      ],
      next: {
        ru: "Применить к следующему новичку, через месяц собрать обратную связь и скорректировать онбординг.",
        ro: "Aplicați acest lucru la următorul angajat nou, iar după o lună colectați feedback și ajustați onboardingul.",
      },
      mentionsJobber: false,
    },
    suggestedMetric: {
      ru: "Доля новичков, у которых до первого дня готов чек-лист, и их оценка первого месяца.",
      ro: "Ponderea angajaților noi cu lista de verificare pregătită înainte de prima zi și evaluarea primei luni de către ei.",
    },
  },
  {
    id: "retention",
    number: 6,
    title: { ru: "Удержание и опыт сотрудников", ro: "Retenția și experiența angajaților" },
    prompt: {
      ru: "Понимаете ли вы, почему сотрудники остаются или уходят?",
      ro: "Înțelegeți de ce angajații rămân sau pleacă?",
    },
    questions: [
      { id: "q6_1", number: "6.1", sectionId: "retention", text: { ru: "Компания регулярно получает обратную связь от сотрудников (раз в полгода / раз в год).", ro: "Compania primește regulat feedback de la angajați (o dată la șase luni / o dată pe an)." } },
      { id: "q6_2", number: "6.2", sectionId: "retention", text: { ru: "HR понимает основные причины увольнений.", ro: "HR-ul înțelege principalele motive ale plecărilor din companie." } },
      { id: "q6_3", number: "6.3", sectionId: "retention", text: { ru: "После увольнений анализируются причины ухода, а не только фиксируется сам факт.", ro: "După plecări se analizează motivele, nu doar se consemnează faptul în sine." } },
      { id: "q6_4", number: "6.4", sectionId: "retention", text: { ru: "Руководители регулярно проводят встречи 1:1 с сотрудниками.", ro: "Managerii au regulat întâlniri 1:1 cu angajații." } },
      { id: "q6_5", number: "6.5", sectionId: "retention", text: { ru: "Сотрудники понимают, как оценивается их результат и какие у них есть возможности развития.", ro: "Angajații înțeleg cum le este evaluat rezultatul și ce oportunități de dezvoltare au." } },
    ],
    growth: {
      meaning: {
        ru: "Компания реагирует на увольнения уже после факта и не всегда понимает, какие причины можно было обнаружить раньше.",
        ro: "Compania reacționează la plecări abia după ce acestea au avut loc și nu înțelege întotdeauna ce motive ar fi putut fi depistate mai devreme.",
      },
      actions: [
        { id: "a6_1", addressesQuestions: ["q6_1", "q6_4", "q6_5"], text: { ru: "Ввести регулярные встречи 1:1 руководителей и сотрудников.", ro: "Introduceți întâlniri regulate 1:1 între manageri și angajați." } },
        { id: "a6_2", addressesQuestions: ["q6_3"], text: { ru: "Стандартизировать exit interview.", ro: "Standardizați interviul de ieșire (exit interview)." } },
        { id: "a6_3", addressesQuestions: ["q6_2"], text: { ru: "Группировать причины увольнений и определить 2–3 наиболее частые.", ro: "Grupați motivele plecărilor și identificați cele mai frecvente 2–3 dintre ele." } },
      ],
      next: {
        ru: "Выбрать главную повторяющуюся причину ухода и одно изменение для проверки в течение месяца.",
        ro: "Alegeți principalul motiv recurent de plecare și o singură schimbare pe care să o testați timp de o lună.",
      },
      mentionsJobber: false,
    },
    suggestedMetric: {
      ru: "Количество проведённых встреч 1:1 и доля добровольных увольнений за период.",
      ro: "Numărul de întâlniri 1:1 desfășurate și ponderea plecărilor voluntare în perioada respectivă.",
    },
  },
  {
    // Source recommendation page 16 was mislabeled; this content belongs to HR analytics (section 7).
    id: "hr_analytics",
    number: 7,
    title: { ru: "HR-аналитика", ro: "Analitica HR" },
    prompt: {
      ru: "Принимаете ли вы HR-решения на основании данных?",
      ro: "Luați decizii de HR pe baza datelor?",
    },
    questions: [
      { id: "q7_1", number: "7.1", sectionId: "hr_analytics", text: { ru: "Мы регулярно знаем, сколько вакансий открыто и на каком они этапе.", ro: "Știm în mod regulat câte posturi vacante sunt deschise și în ce etapă se află." } },
      { id: "q7_2", number: "7.2", sectionId: "hr_analytics", text: { ru: "Мы отслеживаем срок закрытия вакансий.", ro: "Urmărim termenul de închidere a posturilor vacante." } },
      { id: "q7_3", number: "7.3", sectionId: "hr_analytics", text: { ru: "Мы видим, сколько кандидатов проходит через основные этапы воронки.", ro: "Vedem câți candidați trec prin principalele etape ale pâlniei de recrutare." } },
      { id: "q7_4", number: "7.4", sectionId: "hr_analytics", text: { ru: "Мы сравниваем эффективность каналов поиска на основе данных о кандидатах и найме.", ro: "Comparăm eficiența canalelor de recrutare pe baza datelor despre candidați și angajări." } },
      { id: "q7_5", number: "7.5", sectionId: "hr_analytics", text: { ru: "HR регулярно использует данные для обсуждения проблем и решений с руководством.", ro: "HR-ul folosește regulat datele pentru a discuta problemele și soluțiile cu conducerea." } },
    ],
    growth: {
      meaning: {
        ru: "HR видит отдельные события: открыта вакансия, найден кандидат, сотрудник ушёл — но не всегда видна система и динамика между ними.",
        ro: "HR-ul vede evenimente separate — s-a deschis un post, s-a găsit un candidat, un angajat a plecat —, dar nu vede întotdeauna sistemul și dinamica dintre ele.",
      },
      actions: [
        { id: "a7_1", addressesQuestions: ["q7_1", "q7_2", "q7_3"], text: { ru: "Создать простой HR-дашборд с открытыми вакансиями, сроком закрытия и количеством кандидатов на этапах.", ro: "Creați un dashboard HR simplu, cu posturile deschise, termenul de închidere și numărul de candidați pe etape." } },
        { id: "a7_2", addressesQuestions: ["q7_4"], text: { ru: "Начать фиксировать источник каждого кандидата.", ro: "Începeți să înregistrați sursa fiecărui candidat." } },
        { id: "a7_3", addressesQuestions: ["q7_5"], text: { ru: "Раз в месяц выбирать одну проблему и принимать решение на основании данных.", ro: "O dată pe lună, alegeți o problemă și luați o decizie pe baza datelor." } },
      ],
      next: {
        ru: "Начать с нескольких показателей, которые помогают принимать реальные решения.",
        ro: "Începeți cu câțiva indicatori care vă ajută să luați decizii reale.",
      },
      mentionsJobber: false,
    },
    suggestedMetric: {
      ru: "Количество HR-показателей, которые обновляются ежемесячно и обсуждаются с руководством.",
      ro: "Numărul de indicatori HR actualizați lunar și discutați cu conducerea.",
    },
  },
];

export const ALL_QUESTIONS = SECTIONS.flatMap((s) => s.questions);
export const QUESTION_COUNT = ALL_QUESTIONS.length;

export const LEVELS: Level[] = [
  {
    id: "needs_systematization",
    min: 0,
    max: 24,
    title: { ru: "HR-система требует систематизации", ro: "Sistemul HR are nevoie de sistematizare" },
    description: {
      ru: "Большая часть процессов либо отсутствует, либо работает ситуативно. На этом уровне основная задача — создать понятную базу: стандартизировать ключевые процессы, определить ответственность и начать измерять результаты.",
      ro: "Majoritatea proceselor fie lipsesc, fie funcționează situațional. La acest nivel, sarcina principală este crearea unei baze clare: standardizarea proceselor-cheie, stabilirea responsabilităților și începerea măsurării rezultatelor.",
    },
  },
  {
    id: "basic",
    min: 25,
    max: 44,
    title: { ru: "Базовая HR-система сформирована", ro: "Sistemul HR de bază este format" },
    description: {
      ru: "Основные HR-процессы уже существуют, но часть из них работает непоследовательно и может зависеть от конкретных сотрудников. Следующий шаг — убрать разрывы в процессах и сделать их более стабильными и измеримыми.",
      ro: "Principalele procese HR există deja, dar o parte dintre ele funcționează inconsecvent și pot depinde de anumiți angajați. Următorul pas este eliminarea golurilor din procese, pentru ca acestea să devină mai stabile și mai ușor de măsurat.",
    },
  },
  {
    id: "mature",
    min: 45,
    max: 59,
    title: { ru: "Зрелая HR-функция", ro: "Funcție HR matură" },
    description: {
      ru: "Большинство основных процессов системны. Следующая задача — повышать эффективность HR, глубже работать с данными и связывать HR-показатели с бизнес-результатами.",
      ro: "Majoritatea proceselor principale sunt sistematice. Următoarea sarcină este creșterea eficienței HR, lucrul mai aprofundat cu datele și corelarea indicatorilor HR cu rezultatele afacerii.",
    },
  },
  {
    id: "strategic",
    min: 60,
    max: 70,
    title: { ru: "HR как стратегическая функция", ro: "HR-ul ca funcție strategică" },
    description: {
      ru: "HR-процессы системны, повторяемы и измеримы. Следующий уровень — использовать HR-данные для прогнозирования потребности в людях, развития сотрудников и повышения эффективности бизнеса.",
      ro: "Procesele HR sunt sistematice, repetabile și măsurabile. Următorul nivel este utilizarea datelor HR pentru a prognoza necesarul de personal, a dezvolta angajații și a crește eficiența afacerii.",
    },
  },
];

export function getSection(id: string): Section | undefined {
  return SECTIONS.find((s) => s.id === id);
}
/**
 * Pure scoring functions. No browser APIs, no side effects — shared by the
 * client and the server (which recomputes scores from raw answers).
 */
export type Answers = Partial<Record<string, AnswerValue>>;

/** 0–4 explicit growth area, 5–9 optional improvement, 10 strong (perfect). */
export type SectionStatus = "growth" | "optional" | "strong";

export interface SectionResult {
  id: SectionId;
  number: number;
  score: number;
  status: SectionStatus;
}

export interface PrioritizedAction {
  action: GrowthAction;
  /** Questions linked to this action that were answered below 2. */
  weakQuestionIds: string[];
  /** Sum of (2 - answer) over linked questions. Higher = more urgent. */
  weight: number;
}

export interface FocusArea {
  sectionId: SectionId;
  score: number;
  status: Exclude<SectionStatus, "strong">;
  actions: PrioritizedAction[];
}

export interface AuditResult {
  total: number;
  percent: number;
  level: Level;
  sections: SectionResult[];
  /** Question IDs answered 2, in source order. */
  strengths: string[];
  /** Up to three lowest non-perfect sections, ascending, ties by source order. */
  focusAreas: FocusArea[];
}

export function isAnswerValue(v: unknown): v is AnswerValue {
  return v === 0 || v === 1 || v === 2;
}

export function countAnswered(answers: Answers, sections: Section[] = SECTIONS): number {
  return sections.reduce(
    (n, s) => n + s.questions.filter((q) => isAnswerValue(answers[q.id])).length,
    0,
  );
}

export function unansweredQuestionIds(answers: Answers, sections: Section[] = SECTIONS): string[] {
  return sections.flatMap((s) => s.questions.filter((q) => !isAnswerValue(answers[q.id])).map((q) => q.id));
}

export function isComplete(answers: Answers, sections: Section[] = SECTIONS): boolean {
  return unansweredQuestionIds(answers, sections).length === 0;
}

export function isSectionComplete(section: Section, answers: Answers): boolean {
  return section.questions.every((q) => isAnswerValue(answers[q.id]));
}

/** Section score 0–10, or null when any statement in the section is unanswered. */
export function sectionScore(section: Section, answers: Answers): number | null {
  let sum = 0;
  for (const q of section.questions) {
    const v = answers[q.id];
    if (!isAnswerValue(v)) return null;
    sum += v;
  }
  return sum;
}

export function statusForScore(score: number): SectionStatus {
  if (!Number.isInteger(score) || score < 0 || score > SECTION_MAX) {
    throw new RangeError(`Section score out of range: ${score}`);
  }
  if (score <= 4) return "growth";
  if (score <= 9) return "optional";
  return "strong";
}

export function levelForTotal(total: number): Level {
  if (!Number.isInteger(total) || total < 0 || total > TOTAL_MAX) {
    throw new RangeError(`Total score out of range: ${total}`);
  }
  const level = LEVELS.find((l) => total >= l.min && total <= l.max);
  if (!level) throw new RangeError(`No level for total ${total}`);
  return level;
}

/**
 * Orders the section's canonical actions by the respondent's weak answers.
 * Never adds or rewrites actions; only reorders. Stable: ties keep source order.
 */
export function prioritizeActions(section: Section, answers: Answers): PrioritizedAction[] {
  return section.growth.actions
    .map((action, index) => {
      const weakQuestionIds = action.addressesQuestions.filter((qid) => {
        const v = answers[qid];
        return isAnswerValue(v) && v < 2;
      });
      const weight = action.addressesQuestions.reduce((w, qid) => {
        const v = answers[qid];
        return w + (isAnswerValue(v) ? 2 - v : 0);
      }, 0);
      return { action, weakQuestionIds, weight, index };
    })
    .sort((a, b) => b.weight - a.weight || a.index - b.index)
    .map(({ action, weakQuestionIds, weight }) => ({ action, weakQuestionIds, weight }));
}

/** Lowest non-perfect sections ascending; ties resolved by source order. */
export function selectFocusSections(sections: SectionResult[], limit = 3): SectionResult[] {
  return sections
    .map((s, index) => ({ s, index }))
    .filter(({ s }) => s.score < SECTION_MAX)
    .sort((a, b) => a.s.score - b.s.score || a.index - b.index)
    .slice(0, limit)
    .map(({ s }) => s);
}

/** Full result, or null when the audit is incomplete (all 35 answers are required). */
export function computeResult(answers: Answers, sections: Section[] = SECTIONS): AuditResult | null {
  if (!isComplete(answers, sections)) return null;

  const sectionResults: SectionResult[] = sections.map((s) => {
    const score = sectionScore(s, answers) as number;
    return { id: s.id, number: s.number, score, status: statusForScore(score) };
  });
  const total = sectionResults.reduce((n, s) => n + s.score, 0);
  const strengths = sections.flatMap((s) => s.questions.filter((q) => answers[q.id] === 2).map((q) => q.id));

  const focusAreas: FocusArea[] = selectFocusSections(sectionResults).map((s) => {
    const section = sections.find((x) => x.id === s.id) as Section;
    return {
      sectionId: s.id,
      score: s.score,
      status: s.status as FocusArea["status"],
      actions: prioritizeActions(section, answers),
    };
  });

  return {
    total,
    percent: Math.round((total / TOTAL_MAX) * 100),
    level: levelForTotal(total),
    sections: sectionResults,
    strengths,
    focusAreas,
  };
}

export type SectionScores = Record<SectionId, number>;

export function toSectionScores(result: AuditResult): SectionScores {
  return Object.fromEntries(result.sections.map((s) => [s.id, s.score])) as SectionScores;
}
