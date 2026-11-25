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
  lines.push("",t("Repetă evaluarea peste 3 luni:","Повторите диагностику через 3 месяца:"),SITE+"/?restart=1&lang="+lang,"", "Jobber.md");
  lines.push("",t("Urmărește-ne în rețelele sociale","Мы в соцсетях"),"Telegram: https://t.me/jobber_md","Facebook: https://www.facebook.com/Jobber.moldova","Instagram: https://www.instagram.com/jobber_moldova?fqnt=MWozNGlmMXF3cGU5ZQ==");
  return lines.join("\n");
}

function esc_(v){return String(v==null?"":v).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
const EMAIL_ICONS={"telegram":"iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAwFBMVEUintkAAAD9/v4hntkindkvo9sintkindjN6fYA//+s2vBXteJ3w+eJy+pFrd5pveW74fMjndmX0e0ameYql9Xd8PkkoNsfm9gin9hJr+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVm2FsAAAAQHRSTlP+AP9NsP+I0/8B/////////yT/Cgz/IyF3/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGWZ0bAAAAYNJREFUeNq1ltl6hCAMhVMWWdy3afv+L1pAhaAgM532XMynTn7hJBCEjxcF7wMLrZgAI8EqupQARRlEYlTdAVTARYJmgZFBUmxMAxSyoglAVXCjSp2B+3hEHEAh3hAxQKEoioERntADAew+lG/ZDcDthHgvyRAmZQEl8uHfmhjJreZqB7ID8EYSJx18Q95BrcmhFrwLAyzJl7erC+0b+1vvT2cH0PzLNXfxhIdawLXIXXvMpIbtUqJyw8mCTeKuiYOOPDsTBkBJ7SbvU3bAD9eN30wOuCRxzwv3t51/IwZCEgkZOI4nkATCbEhvZxduZRowyZzWLZf2Go03nQARpXRwRepRvBsQm06sjAbH+7Idaa0K8STap8mloaP4IdqmycU3REAb/pgzy1tGQI0tpDeQASRvr55pbovaeFOKbUesIakq1wTc0oB98em4MyXbTI/z22AHxUbWDdJbGN9pla8343K7v55AX0/Fv3FkGT1yh+LnXx27vzjYrWb86TD/x8dJQT9ZGAzRSNBL+QAAAABJRU5ErkJggg==","facebook":"iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAwFBMVEUYd/IAAAD+/v7R5PxHkvUYd/EYd/IYdvEYd/EAAP9wqvYVdvAXgOeZw/kyhvOLuviiyPq10/sUdusYePIgfPJKlPR+s/jL4f3i7v0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgWU6TAAAAQHRSTlP+AP/+/02widMB/yMK//////8Nd/+9/9P/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtknkoAAAAT5JREFUeNq11tlyhSAMANAUDQhuvd3//0vrgHhJIAjTad50ckbCFuGlM+DvYEGjJzhi0gaXO2BRAwmNtgZwgiwmFMGsoRh6LgOkaZvb13Xdv9wGgAVgDUkfBxXDHY/GcsDyX5Ui4CkikPMDAEMBHb9TOYh1BDDTen9KAOYE0PkcVRHoJ2ATusbUfSPvMQLL1vdx5q98ze0J2AcgLsHIlxxPoFuBDuANWgEsHmA7QA9MOzAeJCWMPiJw4fGDFHGAZFJVKZLFmDyAG5COqQUMveDRC/YM3BTtgBedTOvg4xq9jxH4tHYvXPfWWHo3X/f27j9A/IhK4Dqi/BMSQOmaEYAWLzIBzOJVWQYoX8ZFYCrXfQmYvAO914CptqwcYL0pciA1xavtUlBpu7Gxp+CmsYdfh+9w1IbPhl+Hf/ib+QWj+QwDObMnggAAAABJRU5ErkJggg==","instagram":"iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAwFBMVEXxmo7oZGn7zK3mrMrcZZr4qm6uRpzoU0l4S7d0Tbl2TbnxaTLjTVbvZTfybDD/xmNrVbmASrTcOmXcN2jaM2vzbC/hQ1v/v1X7vlz9vFj8wlz+wl79wl7tyuEAAP9yT8HdPF7//wAAAAD+/v7pVkb6hibiR1euN5HSK3fvZjbbNmj2dSf6mDf7p0aNRKn8tlP95dP11eN7SrX6fR/8oT/76OiePp2aP6H62NTBMYXFL4L2yM7tlafsZlHnZG70hFJcu59rAAAAQHRSTlP///////D/WNRQqqgbG+EREAVrttdsmghKoVa01P8BHR4BAP/+//7///7+/v///v7///7/////////////////vVTLJwAAAnlJREFUeNqt1umSmkAQAODhWrzd+0iyuVR2EYygIcGI+P5vleljDtSK7Fa6yj86X01PdzMovr8xxPvB1+ub2/krxJ/NC8Wv3z8gOr3u1REY3EdziJNitVp1PzdBGMn4p+hd2iCcRmdF54sB4XTaRlwqMJhOW4meAv24pegSGMaxEU7lbXMdz564sETnCsFdrEW9nRyFd2FEF0E/VkJMTkVuRA/BKGER0IKi1CkV9IUWHQRJQsLBH0Xj5BuvuYcCKFz5U3lQK5/PoU6OYE0CNih2XF3H8VF4fA5VKwQzEnBiQdUVJSwqfdohlx+f+0GABGS0A1CXuj7+a7X1fMoJBQMUclkBtdpZFS18OIis1TP3XAEQ2WSSQXUzWLmtKuxhDkDmlPOUaCAFAzhK4cDBa+iC3wAvBszWDOAADtWqhq3mBDYWSEkASOIEFqlJhKxkdQHw7BJIDUj2qrggKthtPgfA084gPQBq2m1AQoFUA0jJVdO+tQEKDVICa2zHZE8ChqWMNACB4CcJALK6MOMFCgfKKodXAykQLEggoH7IrITAxpVQLLlpzs85ARJyYQH9mNmjUQMooB0kGKCA4UtRZGp9SdMOw8fPhwIgIHmXpiSg8eZ+wLBU/EQhWJJYwKIFT2Ky3yfqLimouCgIsHAbQt0MO9jNU08tAxILqk9qi53Ai6NWzzmCQAsuTaaDrhloBolbBE/L5h5HEeh79wbB49II93i565ib+hrBQ2BEuhCuySgrXeFYN3U0oOv+w9ISPLsHtSJxr95AH1uKgQIPn1qJ0LwUx21EaL92x2ezGoXNF/u3MyfvD4/+Oowfn4LTYtS/G/6PPyct4y/DGFcoCe6JJgAAAABJRU5ErkJggg=="};
function inlineIcons_(){const images={};Object.keys(EMAIL_ICONS).forEach(k=>{images[k]=Utilities.newBlob(Utilities.base64Decode(EMAIL_ICONS[k]),"image/png",k+".png")});return images;}
function htmlReport_(r,lang){
  const t=(ro,ru)=>lang==="ru"?ru:ro, e=esc_;
  const purple="#6928ed", ink="#201636", muted="#625c71", pale="#f2ebff";
  const heading=(s)=>'<h2 style="font-family:Arial,sans-serif;font-size:20px;line-height:1.3;margin:0 0 16px;color:'+ink+'">'+e(s)+'</h2>';
  const bar=(value,max)=>'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0;background:#e9e0fa;border-radius:6px;"><tr><td width="'+Math.round(value/max*100)+'%" height="8" bgcolor="'+purple+'" style="font-size:0;line-height:8px;border-radius:6px;'+(value===0?'display:none;':'')+'">'+(value?'&nbsp;':'')+'</td><td width="'+(100-Math.round(value/max*100))+'%" height="8" style="font-size:0;line-height:8px;">&nbsp;</td></tr></table>';
  const panel=(content)=>'<tr><td style="padding:0 24px 16px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e4d9f4;border-radius:14px;background:#ffffff;"><tr><td style="padding:22px;">'+content+'</td></tr></table></td></tr>';
  const button=(url,label)=>'<table role="presentation" cellspacing="0" cellpadding="0"><tr><td bgcolor="'+purple+'" style="border-radius:9px;"><a href="'+e(url)+'" style="display:inline-block;padding:14px 20px;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;">'+e(label)+' &rarr;</a></td></tr></table>';
  const shareUrl=SITE+"/";
  const shareMessage=t("Sistemul nostru HR a obținut ","Наша HR-система набрала ")+r.total+t(" din 70 de puncte. Dar al vostru?"," из 70 баллов. А ваша?")+"\n\n"+t("Descoperă rezultatul tău cu evaluarea HR gratuită de la Jobber:","Узнайте свой результат — пройдите бесплатную HR-диагностику от Jobber:");
  const telegramUrl="https://t.me/share/url?url="+encodeURIComponent(shareUrl)+"&text="+encodeURIComponent(shareMessage);
  const whatsappUrl="https://wa.me/?text="+encodeURIComponent(shareMessage+"\n"+shareUrl);
  const restartUrl=shareUrl+"?restart=1&lang="+lang;
  const shareButton=(url,label,bg)=>'<a href="'+e(url)+'" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:'+bg+';border-radius:9px;padding:14px 22px;margin:0 8px 10px 0;color:#ffffff;font-size:15px;font-weight:bold;text-decoration:none;">'+e(label)+'</a>';
  const shareBlock='<div style="margin:6px 0 0;">'+shareButton(telegramUrl,"Telegram","#168AC5")+shareButton(whatsappUrl,"WhatsApp","#168448")+'</div><p style="font-size:13px;line-height:1.6;margin:8px 0 0;color:'+muted+';">'+e(t("Sau trimite linkul:","Или отправьте ссылку:"))+'<br><a href="'+e(shareUrl)+'" style="color:'+purple+';overflow-wrap:anywhere;word-break:break-all;text-decoration:underline;">'+e(shareUrl)+'</a></p>';
  const socialLinks=[["Telegram","https://t.me/jobber_md","telegram"],["Facebook","https://www.facebook.com/Jobber.moldova","facebook"],["Instagram","https://www.instagram.com/jobber_moldova?fqnt=MWozNGlmMXF3cGU5ZQ==","instagram"]];
  const socialBlock='<tr><td align="center" style="padding:8px 24px 12px;"><p style="margin:0 0 12px;font-size:13px;font-weight:bold;color:'+muted+';">'+e(t("Urmărește-ne","Мы в соцсетях"))+'</p><table role="presentation" align="center" cellspacing="0" cellpadding="0"><tr>'+socialLinks.map(v=>'<td style="padding:0 8px;"><a href="'+e(v[1])+'" target="_blank" rel="noopener noreferrer" title="'+e(v[0])+'"><img src="cid:'+v[2]+'" width="30" height="30" alt="'+e(v[0])+'" style="display:block;border:0;outline:none;width:30px;height:30px;"></a></td>').join("")+'</tr></table></td></tr>';
  const restartBlock=heading(t("Repetă evaluarea","Пройдите диагностику повторно"))+'<p style="font-size:14px;line-height:1.6;color:'+muted+';margin:0 0 16px;">'+e(t("Evaluează progresul peste 3 luni și compară rezultatele.","Оцените прогресс через 3 месяца и сравните результаты."))+'</p>'+button(restartUrl,t("Repetă evaluarea","Пройти ещё раз"));
  const percent=Math.round(r.total/70*100);
  const profile=SECTIONS.map((s,i)=>'<tr><td style="padding:0 0 6px;font-size:14px;font-weight:bold;color:'+ink+';">'+e(s.title[lang])+'</td><td align="right" style="padding:0 0 6px 10px;font-weight:bold;font-size:14px;color:'+purple+';white-space:nowrap;">'+r.scores[i]+'/10</td></tr><tr><td colspan="2" style="padding:0 0 17px;">'+bar(r.scores[i],10)+'</td></tr>').join("");
  const focus=r.focus.length?r.focus.map((f,i)=>'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:'+pale+';border-radius:10px;margin:0 0 12px;"><tr><td style="padding:16px;"><p style="margin:0 0 10px;font-size:15px;font-weight:bold;color:'+purple+';">'+(i+1)+'. '+e(SECTIONS[f.i].title[lang])+' &middot; '+f.score+'/10</p>'+f.actions.map(a=>'<p style="font-size:14px;line-height:1.6;margin:0 0 7px;color:'+ink+';">&bull; '+e(a[lang])+'</p>').join("")+'</td></tr></table>').join(""):'<p style="font-size:14px;line-height:1.6;color:'+muted+';">'+e(t("Toate direcțiile au punctaj maxim. Mențineți standardele.","Все направления получили максимальный балл. Поддерживайте стандарты."))+'</p>';
  let plan="";
  if(r.focus.length){
    const f=r.focus[0];
    const items=f.actions.map((a,i)=>({title:t("Săptămâna ","Неделя ")+(i+1),body:a[lang]}));
    items.push({title:t("Săptămâna 4 · indicator sugerat","Неделя 4 · предлагаемый показатель"),body:SECTIONS[f.i].metric[lang]});
    plan='<p style="font-size:14px;color:'+muted+';margin:0 0 14px;">'+e(t("Prioritate: ","Приоритет: ")+SECTIONS[f.i].title[lang])+'</p>'+items.map(v=>'<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:'+pale+';border-radius:10px;margin:0 0 10px;"><tr><td width="4" bgcolor="'+purple+'" style="font-size:0;">&nbsp;</td><td style="padding:14px 16px;"><p style="font-size:13px;font-weight:bold;color:'+purple+';margin:0 0 6px;">'+e(v.title)+'</p><p style="font-size:14px;line-height:1.6;margin:0;color:'+ink+';">'+e(v.body)+'</p></td></tr></table>').join("");
  }else{plan='<p style="font-size:14px;line-height:1.6;color:'+muted+';">'+e(t("Mențineți standardele și urmăriți indicatorii.","Поддерживайте стандарты и отслеживайте показатели."))+'</p>';}
  const score='<p style="color:'+purple+';font-weight:bold;letter-spacing:1px;font-size:11px;margin:0 0 10px;">'+e(t("REZULTATUL EVALUĂRII","РЕЗУЛЬТАТ ДИАГНОСТИКИ"))+'</p><p style="font-size:52px;line-height:1;font-weight:bold;letter-spacing:-2px;color:'+purple+';margin:0 0 8px;">'+r.total+'<span style="font-size:24px;color:'+muted+';letter-spacing:0;"> / 70</span></p><p style="font-size:13px;color:'+muted+';margin:0 0 14px;">'+percent+'% '+e(t("din punctajul maxim","от максимального балла"))+'</p>'+bar(r.total,70)+'<h2 style="font-size:23px;line-height:1.25;margin:20px 0 10px;color:'+ink+';">'+e(r.level.title[lang])+'</h2><p style="font-size:15px;line-height:1.65;color:'+muted+';margin:0;">'+e(r.level.description[lang])+'</p>';
  return '<!doctype html><html lang="'+lang+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body style="margin:0;padding:0;background:#f6f3fb;font-family:Arial,sans-serif;color:'+ink+';"><div style="display:none;max-height:0;overflow:hidden;opacity:0;">'+e(t("Rezultatul tău HR, recomandări și plan de acțiune.","Ваш HR-результат, рекомендации и план действий."))+'</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0" bgcolor="#f6f3fb"><tr><td align="center" style="padding:18px 0;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;width:100%;"><tr><td bgcolor="'+purple+'" style="padding:24px 28px;border-radius:16px 16px 0 0;color:white;"><a href="https://jobber.md/" style="color:#ffffff;font-size:30px;letter-spacing:-1.5px;font-weight:bold;text-decoration:none;">jobber.</a><p style="margin:6px 0 20px;color:#e5d9ff;letter-spacing:2px;font-size:11px;font-weight:bold;">HR DIAGNOSTIC</p><h1 style="font-size:27px;line-height:1.25;color:#ffffff;margin:0 0 8px;">'+e(t("Raportul tău personalizat","Ваш персональный HR-отчёт"))+'</h1><p style="margin:0;color:#ffffff;font-size:14px;line-height:1.5;">'+e(t("7 direcții · 35 de afirmații · Plan de acțiune","7 направлений · 35 вопросов · План действий"))+'</p></td></tr><tr><td style="padding:20px 24px 16px;font-size:15px;line-height:1.65;color:'+muted+';">'+e(t("Îți mulțumim că ai completat evaluarea. Mai jos găsești rezultatele și pașii concreți pentru dezvoltarea sistemului HR al companiei tale.","Спасибо, что прошли диагностику. Ниже — ваш результат и конкретные шаги для развития HR-системы компании."))+'</td></tr>'+panel(score)+panel(heading(t("Profilul HR pe direcții","HR-профиль по направлениям"))+'<table role="presentation" width="100%" cellspacing="0" cellpadding="0">'+profile+'</table>')+panel(heading(t("Direcții prioritare de dezvoltare","Приоритетные направления развития"))+focus)+panel(heading(t("Plan pentru următoarele 30 de zile","План на ближайшие 30 дней"))+plan+'<p style="font-size:13px;line-height:1.5;color:'+muted+';margin:14px 0 0;">'+e(t("Repetă evaluarea peste 3 luni și compară rezultatele.","Повторите диагностику через 3 месяца и сравните результаты."))+'</p>')+panel(heading(t("Invită și colegii tăi","Предложите диагностику коллегам"))+'<p style="font-size:14px;color:'+muted+';line-height:1.6;margin:0 0 16px;">'+e(t("Descoperiți împreună oportunitățile de dezvoltare HR.","Узнайте, какие возможности для развития HR есть у вашей команды."))+'</p>'+shareBlock)+panel(restartBlock)+socialBlock+'<tr><td align="center" style="padding:8px 24px 24px;font-size:12px;line-height:1.7;color:'+muted+';">Jobber.md &middot; HR Diagnostic<br>'+e(t("Ai primit acest mesaj pentru că ai solicitat raportul.","Вы получили это письмо, потому что запросили отчёт."))+'<br><a href="https://jobber.md/" style="color:'+purple+';">jobber.md</a> &middot; <a href="'+(lang==="ru"?"https://jobber.md/ru/privacy-policy/":"https://jobber.md/privacy-policy/")+'" style="color:'+purple+';">'+e(t("Confidențialitate","Конфиденциальность"))+'</a></td></tr></table></td></tr></table></body></html>';
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
        MailApp.sendEmail({to:email,subject:d.lang==="ru"?"Ваш результат HR Diagnostic — Jobber":"Rezultatul tău HR Diagnostic — Jobber",body:report_(r,d.lang),htmlBody:htmlReport_(r,d.lang),inlineImages:inlineIcons_(),name:"Jobber HR Diagnostic"});
        mailStatus="sent";
      }catch(err){mailStatus="pending";}
    }
    sh.getRange(rowIndex,14).setValue(mailStatus);
    SpreadsheetApp.flush();
    return json_({ok:true,run:d.run,mailStatus});
  }catch(err){return json_({ok:false,retry:true})}finally{if(lock&&lock.hasLock())lock.releaseLock()}
}
function testScoring(){const a={};for(let i=1;i<=7;i++)for(let j=1;j<=5;j++)a["q"+i+"_"+j]=0;if(compute_(a).total!==0||compute_(a).focus.length!==3)throw new Error("min");Object.keys(a).forEach(k=>a[k]=2);if(compute_(a).total!==70||compute_(a).focus.length!==0)throw new Error("max");Logger.log("Scoring tests OK");}
