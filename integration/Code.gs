// Jobber HR Diagnostic. Paste into a spreadsheet-bound Apps Script project.
// Run setup once, then deploy as a web app (execute as me, access Anyone).
// The spreadsheet must remain private. No external recipients besides the address entered.
const SECTIONS = [
  {
    "title": {
      "ru": "Набор персонала",
      "ro": "Recrutarea personalului"
    },
    "actions": [
      {
        "q": [
          "q1_1",
          "q1_2"
        ],
        "ru": "Для каждой открытой вакансии заранее зафиксировать профиль кандидата и 3–5 обязательных критериев.",
        "ro": "Pentru fiecare post vacant deschis, stabiliți din timp profilul candidatului și 3–5 criterii obligatorii."
      },
      {
        "q": [
          "q1_3"
        ],
        "ru": "Описать единый путь вакансии: открытие → поиск → отбор → интервью → решение.",
        "ro": "Descrieți un parcurs unic al postului vacant: deschidere → căutare → selecție → interviu → decizie."
      },
      {
        "q": [
          "q1_4",
          "q1_5"
        ],
        "ru": "Для следующей вакансии фиксировать источник каждого кандидата и результат по нему.",
        "ro": "Pentru următorul post vacant, înregistrați sursa fiecărui candidat și rezultatul obținut din ea."
      }
    ],
    "metric": {
      "ru": "Доля подходящих кандидатов по каждому каналу поиска и срок закрытия вакансии.",
      "ro": "Ponderea candidaților potriviți pe fiecare canal de căutare și termenul de închidere a postului."
    }
  },
  {
    "title": {
      "ru": "Вакансия и EVP",
      "ro": "Anunțul de angajare și EVP"
    },
    "actions": [
      {
        "q": [
          "q2_1",
          "q2_2",
          "q2_3"
        ],
        "ru": "Переписать одну актуальную вакансию с фокусом на задачи, условия и ценность для кандидата.",
        "ro": "Rescrieți un anunț actual, punând accentul pe sarcini, condiții și valoarea pentru candidat."
      },
      {
        "q": [
          "q2_4"
        ],
        "ru": "Убрать требования, которые не являются действительно обязательными.",
        "ro": "Eliminați cerințele care nu sunt cu adevărat obligatorii."
      },
      {
        "q": [
          "q2_5"
        ],
        "ru": "Проверить вакансию глазами кандидата: понятно ли ему, чем он будет заниматься, сколько заработает и почему стоит откликнуться?",
        "ro": "Verificați anunțul prin ochii candidatului: înțelege cu ce se va ocupa, cât va câștiga și de ce merită să aplice?"
      }
    ],
    "metric": {
      "ru": "Количество и доля релевантных откликов на обновлённую вакансию за 30 дней.",
      "ro": "Numărul și ponderea candidaturilor relevante la anunțul actualizat în 30 de zile."
    }
  },
  {
    "title": {
      "ru": "Опыт кандидата",
      "ro": "Experiența candidatului"
    },
    "actions": [
      {
        "q": [
          "q3_2",
          "q3_4"
        ],
        "ru": "Зафиксировать стандартные сроки ответа кандидату после каждого этапа.",
        "ro": "Stabiliți termene standard de răspuns pentru candidat după fiecare etapă."
      },
      {
        "q": [
          "q3_3",
          "q3_5"
        ],
        "ru": "Сделать единый сценарий коммуникации: отклик → приглашение → интервью → решение. В случае отказа отправьте сообщение или электронное письмо либо позвоните и поблагодарите за отклик; если отказ последовал после собеседования, дайте краткую обратную связь и также поблагодарите за отклик.",
        "ro": "Creați un scenariu unic de comunicare: aplicare → invitație → interviu → decizie. În caz de refuz, trimiteți un mesaj sau un e-mail ori sunați și mulțumiți pentru aplicare; dacă refuzul vine după interviu, oferiți un feedback scurt și mulțumiți, de asemenea, pentru aplicare."
      },
      {
        "q": [
          "q3_1"
        ],
        "ru": "Проверить вакансию глазами кандидата: понятно ли ему, чем он будет заниматься, сколько заработает и почему стоит откликнуться?",
        "ro": "Verificați anunțul prin ochii candidatului: înțelege cu ce se va ocupa, cât va câștiga și de ce merită să aplice?"
      }
    ],
    "metric": {
      "ru": "Доля кандидатов, получивших ответ в установленный срок после каждого этапа.",
      "ro": "Ponderea candidaților care primesc răspuns în termenul stabilit după fiecare etapă."
    }
  },
  {
    "title": {
      "ru": "Собеседование и отбор",
      "ro": "Interviul și selecția"
    },
    "actions": [
      {
        "q": [
          "q4_1",
          "q4_3"
        ],
        "ru": "Для одной приоритетной вакансии определить 4–6 критериев оценки.",
        "ro": "Pentru un post vacant prioritar, stabiliți 4–6 criterii de evaluare."
      },
      {
        "q": [
          "q4_2"
        ],
        "ru": "Подготовить одинаковую базовую структуру интервью для всех кандидатов.",
        "ro": "Pregătiți aceeași structură de bază a interviului pentru toți candidații."
      },
      {
        "q": [
          "q4_4",
          "q4_5"
        ],
        "ru": "После каждого интервью фиксировать оценку до обсуждения кандидата с другими участниками.",
        "ro": "După fiecare interviu, consemnați evaluarea înainte de a discuta candidatul cu ceilalți participanți."
      }
    ],
    "metric": {
      "ru": "Доля новых сотрудников, успешно прошедших испытательный срок.",
      "ro": "Ponderea angajaților noi care trec cu succes perioada de probă."
    }
  },
  {
    "title": {
      "ru": "Онбординг",
      "ro": "Onboarding"
    },
    "actions": [
      {
        "q": [
          "q5_1",
          "q5_2"
        ],
        "ru": "Создать чек-лист подготовки к первому рабочему дню.",
        "ro": "Creați o listă de verificare pentru pregătirea primei zile de lucru."
      },
      {
        "q": [
          "q5_4"
        ],
        "ru": "Зафиксировать цели сотрудника на испытательный срок.",
        "ro": "Stabiliți în scris obiectivele angajatului pentru perioada de probă."
      },
      {
        "q": [
          "q5_3",
          "q5_5"
        ],
        "ru": "Назначить регулярные точки обратной связи с руководителем в первый месяц.",
        "ro": "Programați întâlniri regulate de feedback cu managerul în prima lună."
      }
    ],
    "metric": {
      "ru": "Доля новичков, у которых до первого дня готов чек-лист, и их оценка первого месяца.",
      "ro": "Ponderea angajaților noi cu lista de verificare pregătită înainte de prima zi și evaluarea primei luni de către ei."
    }
  },
  {
    "title": {
      "ru": "Удержание и опыт сотрудников",
      "ro": "Retenția și experiența angajaților"
    },
    "actions": [
      {
        "q": [
          "q6_1",
          "q6_4",
          "q6_5"
        ],
        "ru": "Ввести регулярные встречи 1:1 руководителей и сотрудников.",
        "ro": "Introduceți întâlniri regulate 1:1 între manageri și angajați."
      },
      {
        "q": [
          "q6_3"
        ],
        "ru": "Стандартизировать exit interview.",
        "ro": "Standardizați interviul de ieșire (exit interview)."
      },
      {
        "q": [
          "q6_2"
        ],
        "ru": "Группировать причины увольнений и определить 2–3 наиболее частые.",
        "ro": "Grupați motivele plecărilor și identificați cele mai frecvente 2–3 dintre ele."
      }
    ],
    "metric": {
      "ru": "Количество проведённых встреч 1:1 и доля добровольных увольнений за период.",
      "ro": "Numărul de întâlniri 1:1 desfășurate și ponderea plecărilor voluntare în perioada respectivă."
    }
  },
  {
    "title": {
      "ru": "HR-аналитика",
      "ro": "Analitica HR"
    },
    "actions": [
      {
        "q": [
          "q7_1",
          "q7_2",
          "q7_3"
        ],
        "ru": "Создать простой HR-дашборд с открытыми вакансиями, сроком закрытия и количеством кандидатов на этапах.",
        "ro": "Creați un dashboard HR simplu, cu posturile deschise, termenul de închidere și numărul de candidați pe etape."
      },
      {
        "q": [
          "q7_4"
        ],
        "ru": "Начать фиксировать источник каждого кандидата.",
        "ro": "Începeți să înregistrați sursa fiecărui candidat."
      },
      {
        "q": [
          "q7_5"
        ],
        "ru": "Раз в месяц выбирать одну проблему и принимать решение на основании данных.",
        "ro": "O dată pe lună, alegeți o problemă și luați o decizie pe baza datelor."
      }
    ],
    "metric": {
      "ru": "Количество HR-показателей, которые обновляются ежемесячно и обсуждаются с руководством.",
      "ro": "Numărul de indicatori HR actualizați lunar și discutați cu conducerea."
    }
  }
];
const LEVELS = [
  {
    "min": 0,
    "max": 24,
    "title": {
      "ru": "HR-система требует систематизации",
      "ro": "Sistemul HR are nevoie de sistematizare"
    },
    "description": {
      "ru": "Большая часть процессов либо отсутствует, либо работает ситуативно. На этом уровне основная задача — создать понятную базу: стандартизировать ключевые процессы, определить ответственность и начать измерять результаты.",
      "ro": "Majoritatea proceselor fie lipsesc, fie funcționează situațional. La acest nivel, sarcina principală este crearea unei baze clare: standardizarea proceselor-cheie, stabilirea responsabilităților și începerea măsurării rezultatelor."
    }
  },
  {
    "min": 25,
    "max": 44,
    "title": {
      "ru": "Базовая HR-система сформирована",
      "ro": "Sistemul HR de bază este format"
    },
    "description": {
      "ru": "Основные HR-процессы уже существуют, но часть из них работает непоследовательно и может зависеть от конкретных сотрудников. Следующий шаг — убрать разрывы в процессах и сделать их более стабильными и измеримыми.",
      "ro": "Principalele procese HR există deja, dar o parte dintre ele funcționează inconsecvent și pot depinde de anumiți angajați. Următorul pas este eliminarea golurilor din procese, pentru ca acestea să devină mai stabile și mai ușor de măsurat."
    }
  },
  {
    "min": 45,
    "max": 59,
    "title": {
      "ru": "Зрелая HR-функция",
      "ro": "Funcție HR matură"
    },
    "description": {
      "ru": "Большинство основных процессов системны. Следующая задача — повышать эффективность HR, глубже работать с данными и связывать HR-показатели с бизнес-результатами.",
      "ro": "Majoritatea proceselor principale sunt sistematice. Următoarea sarcină este creșterea eficienței HR, lucrul mai aprofundat cu datele și corelarea indicatorilor HR cu rezultatele afacerii."
    }
  },
  {
    "min": 60,
    "max": 70,
    "title": {
      "ru": "HR как стратегическая функция",
      "ro": "HR-ul ca funcție strategică"
    },
    "description": {
      "ru": "HR-процессы системны, повторяемы и измеримы. Следующий уровень — использовать HR-данные для прогнозирования потребности в людях, развития сотрудников и повышения эффективности бизнеса.",
      "ro": "Procesele HR sunt sistematice, repetabile și măsurabile. Următorul nivel este utilizarea datelor HR pentru a prognoza necesarul de personal, a dezvolta angajații și a crește eficiența afacerii."
    }
  }
];
const SITE = "https://jobber-hr-diagnostic.onrender.com";
const MAX_REPORTS_PER_DAY = 90;
function setup() {
  const ss=SpreadsheetApp.getActiveSpreadsheet();
  if(!ss||!ss.getSheetByName("Leads"))throw new Error("Open the Jobber Leads spreadsheet and use Extensions > Apps Script");
  PropertiesService.getScriptProperties().setProperty("SHEET_ID",ss.getId());
  Logger.log("Setup complete. Remaining email quota: "+MailApp.getRemainingDailyQuota());
}
function json_(v){return ContentService.createTextOutput(JSON.stringify(v)).setMimeType(ContentService.MimeType.JSON)}
function doGet(){return json_({ok:true,service:"jobber-hr-leads",configured:!!PropertiesService.getScriptProperties().getProperty("SHEET_ID")})}
function safeCell_(v){const s=String(v==null?"":v).trim().slice(0,250);return /^[=+\-@]/.test(s)?"'"+s:s}
function compute_(a){
  if(!a||typeof a!=="object"||Array.isArray(a)||Object.keys(a).length!==35)throw new Error("answers");
  const scores=SECTIONS.map((_,i)=>{let sum=0;for(let j=1;j<=5;j++){const v=a["q"+(i+1)+"_"+j];if(v!==0&&v!==1&&v!==2)throw new Error("answers");sum+=v}return sum});
  const total=scores.reduce((x,y)=>x+y,0),level=LEVELS.find(x=>total>=x.min&&total<=x.max);
  const focus=scores.map((score,i)=>({i,score})).filter(x=>x.score<10).sort((x,y)=>x.score-y.score||x.i-y.i).slice(0,3).map(x=>({...x,actions:SECTIONS[x.i].actions.map((action,j)=>({action,j,weight:action.q.reduce((sum,k)=>sum+2-a[k],0)})).sort((u,v)=>v.weight-u.weight||u.j-v.j).map(v=>v.action)}));
  return {scores,total,level,focus};
}
function report_(r,lang){
  const ru=lang==="ru",t=(ro,ruText)=>ru?ruText:ro;
  const lines=[t("Raportul tău HR Diagnostic","Ваш отчёт HR Diagnostic"),"",r.total+"/70 · "+r.level.title[lang],r.level.description[lang],"",t("Rezultate pe direcții","Результаты по направлениям")];
  SECTIONS.forEach((s,i)=>lines.push(s.title[lang]+": "+r.scores[i]+"/10"));
  lines.push("",t("Direcții prioritare","Приоритетные направления"));
  if(!r.focus.length)lines.push(t("Toate direcțiile au punctaj maxim. Mențineți standardele.","Все направления получили максимальный балл. Поддерживайте стандарты."));
  r.focus.forEach((f,i)=>{lines.push((i+1)+". "+SECTIONS[f.i].title[lang]+" ("+f.score+"/10)");f.actions.forEach(a=>lines.push("• "+a[lang]))});
  lines.push("",t("Plan de 30 de zile","План на 30 дней"));
  if(r.focus.length){const f=r.focus[0];f.actions.forEach((a,i)=>lines.push(t("Săptămâna ","Неделя ")+(i+1)+": "+a[lang]));lines.push(t("Săptămâna 4 · indicator sugerat: ","Неделя 4 · предлагаемый показатель: ")+SECTIONS[f.i].metric[lang])}
  else lines.push(t("Mențineți standardele și urmăriți indicatorii.","Поддерживайте стандарты и отслеживайте показатели."));
  lines.push("",t("Repetă evaluarea peste 3 luni:","Повторите диагностику через 3 месяца:"),SITE,"", "Jobber.md");
  return lines.join("\n");
}
function doPost(e){
  let lock;
  try{
    if(!e||!e.postData||e.postData.contents.length>12000)return json_({ok:false});
    const d=JSON.parse(e.postData.contents);
    const email=String(d.email||"").trim();
    if(d.website||!/^[-a-zA-Z0-9.!#$%&'*+/=?^_`{|}~]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/.test(email)||email.length>254||!["ru","ro"].includes(d.lang)||typeof d.marketing!=="boolean"||!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(d.run))return json_({ok:false});
    const r=compute_(d.answers);
    lock=LockService.getScriptLock();
    if(!lock.tryLock(10000))return json_({ok:false,retry:true});
    const id=PropertiesService.getScriptProperties().getProperty("SHEET_ID");
    if(!id)throw new Error("setup");
    const sh=SpreadsheetApp.openById(id).getSheetByName("Leads");
    if(!sh)throw new Error("sheet");
    const rows=sh.getLastRow()>1?sh.getRange(2,1,sh.getLastRow()-1,14).getValues():[];
    const now=new Date(),dayAgo=now.getTime()-86400000;
    let daily=0, emailDaily=0;
    for(const row of rows){
      if(String(row[1])===d.run){if(String(row[2]).toLowerCase()!==email.toLowerCase())return json_({ok:false});return json_({ok:true,run:d.run,mailStatus:row[13]==="sent"?"sent":"pending"})}
      if(new Date(row[0]).getTime()>=dayAgo){daily++;if(String(row[2]).toLowerCase()===email.toLowerCase())emailDaily++;}
    }
    // Stop repeated submissions and cap automated messages. Never accept arbitrary email text.
    if(emailDaily>=3)return json_({ok:false,retry:true});
    const utm=d.utm&&typeof d.utm==="object"?d.utm:{};
    const rowIndex=sh.getLastRow()+1;
    sh.getRange(rowIndex,1,1,19).setValues([[now,d.run,safeCell_(email),d.lang,d.marketing,r.total,...r.scores,"pending",...["utm_source","utm_medium","utm_campaign","utm_content","utm_term"].map(k=>safeCell_(utm[k]))]]);
    SpreadsheetApp.flush();
    let mailStatus="pending";
    if(daily<MAX_REPORTS_PER_DAY&&MailApp.getRemainingDailyQuota()>0){
      try{
        MailApp.sendEmail({to:email,subject:d.lang==="ru"?"Ваш результат HR Diagnostic — Jobber":"Rezultatul tău HR Diagnostic — Jobber",body:report_(r,d.lang),name:"Jobber HR Diagnostic"});
        mailStatus="sent";
      }catch(err){mailStatus="pending";}
    }
    sh.getRange(rowIndex,14).setValue(mailStatus);
    SpreadsheetApp.flush();
    return json_({ok:true,run:d.run,mailStatus});
  }catch(err){return json_({ok:false,retry:true})}finally{if(lock&&lock.hasLock())lock.releaseLock()}
}
function testScoring(){const a={};for(let i=1;i<=7;i++)for(let j=1;j<=5;j++)a["q"+i+"_"+j]=0;if(compute_(a).total!==0||compute_(a).focus.length!==3)throw new Error("min");Object.keys(a).forEach(k=>a[k]=2);if(compute_(a).total!==70||compute_(a).focus.length!==0)throw new Error("max");Logger.log("Scoring tests OK");}
