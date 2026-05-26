import { useState, useEffect, useCallback, useRef } from "react";

// ─── Data ───────────────────────────────────────────────────────────────
const PACKS = [
  {
    id: "greetings",
    title: "Greetings & Goodbyes",
    emoji: "👋",
    sentences: [
      { de: "Hallo", en: "Hello", pron: "HAH-loh" },
      { de: "Tschüss", en: "Bye", pron: "choos" },
      { de: "Morgen", en: "morning", pron: "MOR-gen" },
      { de: "Abend", en: "evening", pron: "AH-bent" },
      { de: "Nacht", en: "night", pron: "nakht" },
      { de: "Tag", en: "day", pron: "tahk" },
      { de: "Willkommen", en: "welcome", pron: "vil-KOM-en" },
      { de: "Wiedersehen", en: "seeing again", pron: "VEE-der-zay-en" },
      { de: "Gruß", en: "greeting", pron: "groos" },
      { de: "Hei", en: "hi (casual)", pron: "hi" },
      { de: "Servus", en: "hello/bye (southern)", pron: "ZAIR-voos" },
      { de: "Moin", en: "hello (northern)", pron: "moyn" },
      { de: "Grüezi", en: "hello (Swiss)", pron: "GREW-tsee" },
      { de: "Ciao", en: "bye (casual)", pron: "chow" },
      { de: "Abschied", en: "farewell", pron: "AHP-sheet" },
      { de: "Guten Morgen.", en: "Good morning.", pron: "GOO-ten MOR-gen" },
      { de: "Guten Tag.", en: "Hello / Good day.", pron: "GOO-ten tahk" },
      { de: "Guten Abend.", en: "Good evening.", pron: "GOO-ten AH-bent" },
      { de: "Gute Nacht.", en: "Good night.", pron: "GOO-teh nakht" },
      { de: "Auf Wiedersehen.", en: "Goodbye.", pron: "owf VEE-der-zay-en" },
      { de: "Bis später.", en: "See you later.", pron: "bis SHPAY-ter" },
      { de: "Bis morgen.", en: "See you tomorrow.", pron: "bis MOR-gen" },
      { de: "Bis bald.", en: "See you soon.", pron: "bis bahlt" },
      { de: "Bis dann.", en: "See you then.", pron: "bis dahn" },
      { de: "Mach's gut.", en: "Take care.", pron: "mahks goot" },
      { de: "Schönen Tag noch.", en: "Have a nice day.", pron: "SHUR-nen tahk nokh" },
      { de: "Schönes Wochenende.", en: "Have a nice weekend.", pron: "SHUR-nes VOH-khen-en-deh" },
      { de: "Herzlich willkommen.", en: "Warm welcome.", pron: "HAIRTS-likh vil-KOM-en" },
      { de: "Einen schönen Abend.", en: "Have a nice evening.", pron: "EYE-nen SHUR-nen AH-bent" },
      { de: "Wir sehen uns.", en: "We'll see each other.", pron: "veer ZAY-en oons" },
      { de: "Pass auf dich auf.", en: "Take care of yourself.", pron: "pahs owf dikh owf" },
      { de: "Grüß dich.", en: "Hi there (southern).", pron: "grews dikh" },
      { de: "Na?", en: "Hey, what's up?", pron: "nah" },
      { de: "Schönen Feierabend.", en: "Enjoy your evening off.", pron: "SHUR-nen FY-er-ah-bent" },
      { de: "Schlaf gut.", en: "Sleep well.", pron: "shlahf goot" },
      { de: "Hallo, wie geht es dir?", en: "Hello, how are you?", pron: "HAH-loh vee gayt ess deer" },
      { de: "Guten Morgen, haben Sie gut geschlafen?", en: "Good morning, did you sleep well?", pron: "GOO-ten MOR-gen HAH-ben zee goot geh-SHLAH-fen" },
      { de: "Schön, dich zu sehen!", en: "Nice to see you!", pron: "shurn dikh tsoo ZAY-en" },
      { de: "Ich muss jetzt leider gehen.", en: "I unfortunately have to go now.", pron: "ikh moos yetst LY-der GAY-en" },
      { de: "Wir sehen uns nächste Woche.", en: "We'll see each other next week.", pron: "veer ZAY-en oons NEKH-steh VO-kheh" },
      { de: "Es war schön, mit dir zu reden.", en: "It was nice talking to you.", pron: "ess vahr shurn mit deer tsoo RAY-den" },
      { de: "Grüß deine Familie von mir.", en: "Say hi to your family from me.", pron: "grews DY-neh fah-MEE-lee-eh fon meer" },
      { de: "Bis zum nächsten Mal.", en: "Until next time.", pron: "bis tsoom NEKH-sten mahl" },
      { de: "Ich wünsche dir einen schönen Tag.", en: "I wish you a nice day.", pron: "ikh VEWN-sheh deer EYE-nen SHUR-nen tahk" },
      { de: "Komm gut nach Hause.", en: "Get home safely.", pron: "kom goot nahkh HOW-zeh" },
      { de: "Danke für den schönen Abend.", en: "Thanks for the nice evening.", pron: "DAHN-keh fyoor dayn SHUR-nen AH-bent" },
      { de: "Melde dich mal wieder.", en: "Get in touch again sometime.", pron: "MEL-deh dikh mahl VEE-der" },
      { de: "Ich freue mich, dich zu sehen.", en: "I'm happy to see you.", pron: "ikh FROY-eh mikh dikh tsoo ZAY-en" },
      { de: "Wir müssen uns bald mal treffen.", en: "We should meet up soon.", pron: "veer MEWS-en oons bahlt mahl TREF-en" },
      { de: "Hattest du einen guten Tag?", en: "Did you have a good day?", pron: "HAH-test doo EYE-nen GOO-ten tahk" },
      { de: "Lass uns bald wieder telefonieren.", en: "Let's call again soon.", pron: "lahs oons bahlt VEE-der teh-leh-foh-NEE-ren" },
      { de: "Es tut mir leid, ich muss los.", en: "I'm sorry, I have to go.", pron: "ess toot meer lite ikh moos lohs" },
      { de: "Einen wunderschönen guten Morgen!", en: "A wonderful good morning!", pron: "EYE-nen VOON-der-shur-nen GOO-ten MOR-gen" },
      { de: "Ich hoffe, wir sehen uns bald wieder.", en: "I hope we see each other again soon.", pron: "ikh HOF-eh veer ZAY-en oons bahlt VEE-der" },
      { de: "Alles Gute zum Geburtstag!", en: "Happy birthday!", pron: "AH-les GOO-teh tsoom geh-BOORTS-tahk" },
    ],
  },
  {
    id: "politeness",
    title: "Basics & Politeness",
    emoji: "🤝",
    sentences: [
      { de: "ja", en: "yes", pron: "yah" },
      { de: "nein", en: "no", pron: "nine" },
      { de: "bitte", en: "please", pron: "BIT-teh" },
      { de: "danke", en: "thanks", pron: "DAHN-keh" },
      { de: "gern", en: "gladly", pron: "gairn" },
      { de: "leider", en: "unfortunately", pron: "LY-der" },
      { de: "natürlich", en: "of course", pron: "nah-TEWR-likh" },
      { de: "selbstverständlich", en: "of course (formal)", pron: "zelpst-fer-SHTEND-likh" },
      { de: "gerne", en: "gladly / with pleasure", pron: "GAIR-neh" },
      { de: "Verzeihung", en: "pardon", pron: "fer-TSY-oong" },
      { de: "Entschuldigung", en: "excuse me / sorry", pron: "ent-SHOOL-dee-goong" },
      { de: "Dankeschön", en: "thank you", pron: "DAHN-keh-shurn" },
      { de: "Bitteschön", en: "you're welcome", pron: "BIT-teh-shurn" },
      { de: "Respekt", en: "respect", pron: "reh-SPEKT" },
      { de: "Höflichkeit", en: "politeness", pron: "HURF-likh-kite" },
      { de: "Ja, bitte.", en: "Yes, please.", pron: "yah BIT-teh" },
      { de: "Nein, danke.", en: "No, thank you.", pron: "nine DAHN-keh" },
      { de: "Danke schön.", en: "Thank you very much.", pron: "DAHN-keh shurn" },
      { de: "Vielen Dank.", en: "Many thanks.", pron: "FEE-len dahnk" },
      { de: "Bitte schön.", en: "You're welcome / Here you go.", pron: "BIT-teh shurn" },
      { de: "Gern geschehen.", en: "You're welcome (my pleasure).", pron: "gairn geh-SHAY-en" },
      { de: "Entschuldigen Sie.", en: "Excuse me (formal).", pron: "ent-SHOOL-dee-gen zee" },
      { de: "Es tut mir leid.", en: "I'm sorry.", pron: "ess toot meer lite" },
      { de: "Kein Problem.", en: "No problem.", pron: "kine pro-BLEM" },
      { de: "Alles klar.", en: "All clear / Got it.", pron: "AH-les klahr" },
      { de: "Genau.", en: "Exactly.", pron: "geh-NOW" },
      { de: "Stimmt.", en: "That's right.", pron: "shtimt" },
      { de: "In Ordnung.", en: "All right / Okay.", pron: "in ORT-noong" },
      { de: "Einverstanden.", en: "Agreed.", pron: "INE-fer-shtahn-den" },
      { de: "Keine Ursache.", en: "Don't mention it.", pron: "KY-neh OOR-zah-kheh" },
      { de: "Macht nichts.", en: "Doesn't matter.", pron: "makht nikhts" },
      { de: "Nicht so schlimm.", en: "Not so bad.", pron: "nikht zoh shlim" },
      { de: "Schon gut.", en: "It's alright.", pron: "shohn goot" },
      { de: "Gerne doch.", en: "Gladly / Of course.", pron: "GAIR-neh dokh" },
      { de: "Auf jeden Fall.", en: "Definitely.", pron: "owf YAY-den fahl" },
      { de: "Das ist sehr nett von Ihnen.", en: "That's very kind of you.", pron: "dahs ist zair net fon EE-nen" },
      { de: "Ich bin Ihnen sehr dankbar.", en: "I'm very grateful to you.", pron: "ikh bin EE-nen zair DAHNK-bar" },
      { de: "Darf ich Sie etwas fragen?", en: "May I ask you something?", pron: "darf ikh zee ET-vahs FRAH-gen" },
      { de: "Würden Sie mir bitte helfen?", en: "Would you please help me?", pron: "VEWR-den zee meer BIT-teh HEL-fen" },
      { de: "Entschuldigen Sie die Störung.", en: "Sorry for the disturbance.", pron: "ent-SHOOL-dee-gen zee dee SHTUR-oong" },
      { de: "Ich möchte mich entschuldigen.", en: "I would like to apologize.", pron: "ikh MURKH-teh mikh ent-SHOOL-dee-gen" },
      { de: "Vielen Dank für Ihre Hilfe.", en: "Thank you very much for your help.", pron: "FEE-len dahnk fyoor EE-reh HIL-feh" },
      { de: "Das wäre sehr freundlich.", en: "That would be very kind.", pron: "dahs VEH-reh zair FROYNT-likh" },
      { de: "Ich schätze das sehr.", en: "I appreciate that very much.", pron: "ikh SHEH-tseh dahs zair" },
      { de: "Könnten Sie das bitte wiederholen?", en: "Could you please repeat that?", pron: "KUR-ten zee dahs BIT-teh VEE-der-hoh-len" },
      { de: "Es war mir ein Vergnügen.", en: "It was my pleasure.", pron: "ess vahr meer ine fer-GNEW-gen" },
      { de: "Ich störe Sie ungern.", en: "I hate to bother you.", pron: "ikh SHTUR-eh zee OON-gairn" },
      { de: "Haben Sie einen Moment Zeit?", en: "Do you have a moment?", pron: "HAH-ben zee EYE-nen mo-MENT tsite" },
      { de: "Dürfte ich bitte vorbei?", en: "May I get by please?", pron: "DEWRF-teh ikh BIT-teh for-BY" },
      { de: "Wie freundlich von Ihnen.", en: "How kind of you.", pron: "vee FROYNT-likh fon EE-nen" },
      { de: "Das muss nicht sein.", en: "That's not necessary.", pron: "dahs moos nikht zine" },
      { de: "Ich weiß das zu schätzen.", en: "I know how to appreciate that.", pron: "ikh vice dahs tsoo SHEH-tsen" },
      { de: "Herzlichen Dank für alles.", en: "Heartfelt thanks for everything.", pron: "HAIRTS-lee-khen dahnk fyoor AH-les" },
      { de: "Bitte entschuldigen Sie die Verspätung.", en: "Please excuse the delay.", pron: "BIT-teh ent-SHOOL-dee-gen zee dee fer-SHPAY-toong" },
      { de: "Darf ich Ihnen etwas anbieten?", en: "May I offer you something?", pron: "darf ikh EE-nen ET-vahs AHN-bee-ten" },
    ],
  },
  {
    id: "conversation",
    title: "Conversation Starters",
    emoji: "💬",
    sentences: [
      { de: "gut", en: "good", pron: "goot" },
      { de: "schlecht", en: "bad", pron: "shlekht" },
      { de: "müde", en: "tired", pron: "MEW-deh" },
      { de: "hungrig", en: "hungry", pron: "HOONG-rikh" },
      { de: "durstig", en: "thirsty", pron: "DOOR-stikh" },
      { de: "froh", en: "happy", pron: "froh" },
      { de: "traurig", en: "sad", pron: "TROW-rikh" },
      { de: "krank", en: "sick", pron: "krahnk" },
      { de: "gesund", en: "healthy", pron: "geh-ZOONT" },
      { de: "beschäftigt", en: "busy", pron: "beh-SHEF-tikht" },
      { de: "entspannt", en: "relaxed", pron: "ent-SHPAHNT" },
      { de: "aufgeregt", en: "excited", pron: "OWF-geh-raykt" },
      { de: "gelangweilt", en: "bored", pron: "geh-LAHNG-vylt" },
      { de: "nervös", en: "nervous", pron: "nair-VURS" },
      { de: "zufrieden", en: "satisfied", pron: "tsoo-FREE-den" },
      { de: "Wie geht's?", en: "How are you?", pron: "vee gayts" },
      { de: "Mir geht's gut.", en: "I'm doing well.", pron: "meer gayts goot" },
      { de: "Und dir?", en: "And you? (informal)", pron: "oont deer" },
      { de: "Und Ihnen?", en: "And you? (formal)", pron: "oont EE-nen" },
      { de: "Nicht schlecht.", en: "Not bad.", pron: "nikht shlekht" },
      { de: "So lala.", en: "So-so.", pron: "zoh lah-LAH" },
      { de: "Es geht.", en: "It's okay.", pron: "ess gayt" },
      { de: "Ganz gut.", en: "Pretty good.", pron: "gahnts goot" },
      { de: "Sehr gut, danke.", en: "Very good, thanks.", pron: "zair goot DAHN-keh" },
      { de: "Was gibt's Neues?", en: "What's new?", pron: "vahs gibts NOY-es" },
      { de: "Lange nicht gesehen.", en: "Long time no see.", pron: "LAHN-geh nikht geh-ZAY-en" },
      { de: "Was machst du so?", en: "What are you up to?", pron: "vahs mahkst doo zoh" },
      { de: "Alles beim Alten.", en: "Same as always.", pron: "AH-les byme AHL-ten" },
      { de: "Mir geht's nicht so gut.", en: "I'm not doing so well.", pron: "meer gayts nikht zoh goot" },
      { de: "Ich bin ein bisschen müde.", en: "I'm a bit tired.", pron: "ikh bin ine BISS-khen MEW-deh" },
      { de: "Wie war dein Tag?", en: "How was your day?", pron: "vee vahr dine tahk" },
      { de: "Schönes Wetter heute.", en: "Nice weather today.", pron: "SHUR-nes VET-ter HOY-teh" },
      { de: "Was hast du am Wochenende vor?", en: "What are your plans for the weekend?", pron: "vahs hahst doo ahm VOH-khen-en-deh for" },
      { de: "Hast du Lust auf einen Kaffee?", en: "Do you feel like having a coffee?", pron: "hahst doo loost owf EYE-nen KAH-fay" },
      { de: "Ich habe gehört, du warst im Urlaub.", en: "I heard you were on vacation.", pron: "ikh HAH-beh geh-HURT doo vahrst im OOR-lowp" },
      { de: "Wie war dein Wochenende?", en: "How was your weekend?", pron: "vee vahr dine VOH-khen-en-deh" },
      { de: "Ich bin gerade erst aufgestanden.", en: "I just got up.", pron: "ikh bin geh-RAH-deh airst OWF-geh-shtahn-den" },
      { de: "Hast du schon gegessen?", en: "Have you eaten yet?", pron: "hahst doo shohn geh-GESS-en" },
      { de: "Ich habe heute frei.", en: "I have the day off today.", pron: "ikh HAH-beh HOY-teh fry" },
      { de: "Was arbeitest du?", en: "What do you do for work?", pron: "vahs AR-by-test doo" },
      { de: "Ich arbeite als …", en: "I work as a …", pron: "ikh AR-by-teh ahls" },
      { de: "Woher kommst du ursprünglich?", en: "Where are you originally from?", pron: "voh-HAIR komst doo oor-SHPREWNG-likh" },
      { de: "Wie lange wohnst du schon hier?", en: "How long have you been living here?", pron: "vee LAHN-geh vohnst doo shohn heer" },
      { de: "Gefällt es dir hier?", en: "Do you like it here?", pron: "geh-FELT ess deer heer" },
      { de: "Was hast du heute noch vor?", en: "What else do you have planned today?", pron: "vahs hahst doo HOY-teh nokh for" },
      { de: "Hast du Geschwister?", en: "Do you have siblings?", pron: "hahst doo geh-SHVIS-ter" },
      { de: "Was sind deine Hobbys?", en: "What are your hobbies?", pron: "vahs zint DY-neh HOB-ees" },
      { de: "Ich lerne gerade Deutsch.", en: "I'm currently learning German.", pron: "ikh LAIR-neh geh-RAH-deh doytch" },
      { de: "Das ist eine gute Frage.", en: "That's a good question.", pron: "dahs ist EYE-neh GOO-teh FRAH-geh" },
      { de: "Erzähl mir mehr darüber.", en: "Tell me more about it.", pron: "air-TSAIL meer mair dah-REW-ber" },
      { de: "Das klingt interessant.", en: "That sounds interesting.", pron: "dahs klingt in-teh-reh-SAHNT" },
      { de: "Ich bin gespannt.", en: "I'm curious / excited to hear.", pron: "ikh bin geh-SHPAHNT" },
      { de: "Wollen wir uns mal treffen?", en: "Shall we meet up sometime?", pron: "VOL-en veer oons mahl TREF-en" },
      { de: "Ich muss dir etwas erzählen.", en: "I have to tell you something.", pron: "ikh moos deer ET-vahs air-TSAI-len" },
    ],
  },
  {
    id: "introductions",
    title: "Introductions",
    emoji: "🙋",
    sentences: [
      { de: "Name", en: "name", pron: "NAH-meh" },
      { de: "Vorname", en: "first name", pron: "FOR-nah-meh" },
      { de: "Nachname", en: "last name", pron: "NAHKH-nah-meh" },
      { de: "Alter", en: "age", pron: "AHL-ter" },
      { de: "Beruf", en: "profession", pron: "beh-ROOF" },
      { de: "Herkunft", en: "origin", pron: "HAIR-koonft" },
      { de: "Sprache", en: "language", pron: "SHPRAH-kheh" },
      { de: "Adresse", en: "address", pron: "ah-DRESS-eh" },
      { de: "Geburtstag", en: "birthday", pron: "geh-BOORTS-tahk" },
      { de: "Familie", en: "family", pron: "fah-MEE-lee-eh" },
      { de: "Freund", en: "friend (male)", pron: "froynt" },
      { de: "Freundin", en: "friend (female)", pron: "FROYN-din" },
      { de: "Kollege", en: "colleague (male)", pron: "ko-LAY-geh" },
      { de: "Kollegin", en: "colleague (female)", pron: "ko-LAY-gin" },
      { de: "Heimat", en: "homeland", pron: "HY-maht" },
      { de: "Ich heiße …", en: "My name is …", pron: "ikh HIGH-seh" },
      { de: "Wie heißt du?", en: "What's your name?", pron: "vee HIGHst doo" },
      { de: "Wie heißen Sie?", en: "What's your name? (formal)", pron: "vee HIGH-sen zee" },
      { de: "Freut mich.", en: "Nice to meet you.", pron: "froyt mikh" },
      { de: "Freut mich sehr.", en: "Very pleased to meet you.", pron: "froyt mikh zair" },
      { de: "Ich komme aus …", en: "I come from …", pron: "ikh KOM-eh ows" },
      { de: "Ich wohne in …", en: "I live in …", pron: "ikh VOH-neh in" },
      { de: "Ich bin … Jahre alt.", en: "I am … years old.", pron: "ikh bin ... YAH-reh ahlt" },
      { de: "Ich bin Student.", en: "I'm a student.", pron: "ikh bin shtoo-DENT" },
      { de: "Ich bin Studentin.", en: "I'm a student (female).", pron: "ikh bin shtoo-DEN-tin" },
      { de: "Ich arbeite bei …", en: "I work at …", pron: "ikh AR-by-teh by" },
      { de: "Meine Muttersprache ist …", en: "My native language is …", pron: "MY-neh MOO-ter-shprah-kheh ist" },
      { de: "Ich bin verheiratet.", en: "I'm married.", pron: "ikh bin fer-HY-rah-tet" },
      { de: "Ich bin ledig.", en: "I'm single.", pron: "ikh bin LAY-dikh" },
      { de: "Ich habe zwei Kinder.", en: "I have two children.", pron: "ikh HAH-beh tsvy KIN-der" },
      { de: "Darf ich mich vorstellen?", en: "May I introduce myself?", pron: "darf ikh mikh FOR-shtel-en" },
      { de: "Ich möchte Ihnen meinen Kollegen vorstellen.", en: "I'd like to introduce my colleague to you.", pron: "ikh MURKH-teh EE-nen MY-nen ko-LAY-gen FOR-shtel-en" },
      { de: "Ich bin hier zum ersten Mal.", en: "I'm here for the first time.", pron: "ikh bin heer tsoom AIR-sten mahl" },
      { de: "Ich bin seit drei Monaten in Deutschland.", en: "I've been in Germany for three months.", pron: "ikh bin zite dry MOH-nah-ten in DOYTCH-lahnt" },
      { de: "Ich lerne seit einem Jahr Deutsch.", en: "I've been learning German for a year.", pron: "ikh LAIR-neh zite EYE-nem yahr doytch" },
      { de: "Ursprünglich komme ich aus den USA.", en: "I'm originally from the USA.", pron: "oor-SHPREWNG-likh KOM-eh ikh ows dayn oo-ess-AH" },
      { de: "Mein Deutsch ist noch nicht so gut.", en: "My German isn't that good yet.", pron: "mine doytch ist nokh nikht zoh goot" },
      { de: "Ich versuche, so viel wie möglich Deutsch zu sprechen.", en: "I try to speak as much German as possible.", pron: "ikh fer-ZOO-kheh zoh feel vee MURG-likh doytch tsoo SHPRE-khen" },
      { de: "Was machen Sie beruflich?", en: "What do you do professionally?", pron: "vahs MAH-khen zee beh-ROOF-likh" },
      { de: "Ich bin von Beruf Ingenieur.", en: "I'm an engineer by profession.", pron: "ikh bin fon beh-ROOF in-zhen-YOOR" },
      { de: "Haben Sie Familie hier?", en: "Do you have family here?", pron: "HAH-ben zee fah-MEE-lee-eh heer" },
      { de: "Mein Mann arbeitet auch hier.", en: "My husband also works here.", pron: "mine mahn AR-by-tet owkh heer" },
      { de: "Meine Frau ist Ärztin.", en: "My wife is a doctor.", pron: "MY-neh frow ist AIRTS-tin" },
      { de: "Wir sind gerade umgezogen.", en: "We just moved.", pron: "veer zint geh-RAH-deh OOM-geh-tsoh-gen" },
      { de: "Ich bin neu in der Stadt.", en: "I'm new in the city.", pron: "ikh bin noy in dair shtat" },
      { de: "Können Sie mir die Stadt empfehlen?", en: "Can you recommend the city to me?", pron: "KUR-nen zee meer dee shtat emp-FAY-len" },
      { de: "Ich bin hier auf Geschäftsreise.", en: "I'm here on a business trip.", pron: "ikh bin heer owf geh-SHEFTS-ry-zeh" },
      { de: "Das ist mein erster Besuch in Deutschland.", en: "This is my first visit to Germany.", pron: "dahs ist mine AIR-ster beh-ZOOKH in DOYTCH-lahnt" },
      { de: "Ich fühle mich hier sehr wohl.", en: "I feel very comfortable here.", pron: "ikh FEW-leh mikh heer zair vohl" },
      { de: "Es ist schön, Sie kennenzulernen.", en: "It's nice to get to know you.", pron: "ess ist shurn zee KEN-en-tsoo-lair-nen" },
    ],
  },
  {
    id: "help",
    title: "Getting Help",
    emoji: "🆘",
    sentences: [
      { de: "Hilfe", en: "help", pron: "HIL-feh" },
      { de: "Problem", en: "problem", pron: "pro-BLEM" },
      { de: "Frage", en: "question", pron: "FRAH-geh" },
      { de: "Antwort", en: "answer", pron: "AHNT-vort" },
      { de: "Bedeutung", en: "meaning", pron: "beh-DOY-toong" },
      { de: "Erklärung", en: "explanation", pron: "air-KLAIR-oong" },
      { de: "Beispiel", en: "example", pron: "BY-shpeel" },
      { de: "Wort", en: "word", pron: "vort" },
      { de: "Satz", en: "sentence", pron: "zahts" },
      { de: "langsam", en: "slow", pron: "LAHNG-zahm" },
      { de: "schnell", en: "fast", pron: "shnel" },
      { de: "nochmal", en: "again", pron: "NOKH-mahl" },
      { de: "verstehen", en: "to understand", pron: "fer-SHTAY-en" },
      { de: "wiederholen", en: "to repeat", pron: "VEE-der-hoh-len" },
      { de: "erklären", en: "to explain", pron: "air-KLAIR-en" },
      { de: "Ich verstehe nicht.", en: "I don't understand.", pron: "ikh fer-SHTAY-eh nikht" },
      { de: "Wie bitte?", en: "Pardon? / Sorry, what?", pron: "vee BIT-teh" },
      { de: "Ich spreche ein bisschen Deutsch.", en: "I speak a little German.", pron: "ikh SHPRE-kheh eye-n BISS-khen doytch" },
      { de: "Sprechen Sie Englisch?", en: "Do you speak English?", pron: "SHPRE-khen zee ENG-lish" },
      { de: "Kannst du das wiederholen?", en: "Can you repeat that? (informal)", pron: "kahnst doo dahs VEE-der-hoh-len" },
      { de: "Könnten Sie das wiederholen?", en: "Could you repeat that? (polite)", pron: "KUR-ten zee dahs VEE-der-hoh-len" },
      { de: "Langsamer, bitte.", en: "Slower, please.", pron: "LAHNG-zah-mer BIT-teh" },
      { de: "Was bedeutet das?", en: "What does that mean?", pron: "vahs beh-DOY-tet dahs" },
      { de: "Wie sagt man … auf Deutsch?", en: "How do you say … in German?", pron: "vee zahkt mahn … owf doytch" },
      { de: "Können Sie mir helfen?", en: "Can you help me?", pron: "KUR-nen zee meer HEL-fen" },
      { de: "Ich brauche Hilfe.", en: "I need help.", pron: "ikh BROW-kheh HIL-feh" },
      { de: "Können Sie das aufschreiben?", en: "Can you write that down?", pron: "KUR-nen zee dahs OWF-shry-ben" },
      { de: "Wie schreibt man das?", en: "How do you spell that?", pron: "vee shrypst mahn dahs" },
      { de: "Ich habe eine Frage.", en: "I have a question.", pron: "ikh HAH-beh EYE-neh FRAH-geh" },
      { de: "Was heißt das auf Englisch?", en: "What does that mean in English?", pron: "vahs hIGHst dahs owf ENG-lish" },
      { de: "Noch einmal, bitte.", en: "Once more, please.", pron: "nokh ine-MAHL BIT-teh" },
      { de: "Können Sie lauter sprechen?", en: "Can you speak louder?", pron: "KUR-nen zee LOW-ter SHPRE-khen" },
      { de: "Ich bin Anfänger.", en: "I'm a beginner.", pron: "ikh bin AHN-feng-er" },
      { de: "Sprechen Sie bitte langsamer.", en: "Please speak more slowly.", pron: "SHPRE-khen zee BIT-teh LAHNG-zah-mer" },
      { de: "Entschuldigung, ich habe das nicht verstanden.", en: "Sorry, I didn't understand that.", pron: "ent-SHOOL-dee-goong ikh HAH-beh dahs nikht fer-SHTAHN-den" },
      { de: "Können Sie den Satz bitte wiederholen?", en: "Can you please repeat the sentence?", pron: "KUR-nen zee dayn zahts BIT-teh VEE-der-hoh-len" },
      { de: "Gibt es jemanden hier, der Englisch spricht?", en: "Is there someone here who speaks English?", pron: "gipt ess YAY-mahn-den heer dair ENG-lish shprikht" },
      { de: "Ich versuche, Deutsch zu lernen.", en: "I'm trying to learn German.", pron: "ikh fer-ZOO-kheh doytch tsoo LAIR-nen" },
      { de: "Können Sie mir das bitte erklären?", en: "Can you please explain that to me?", pron: "KUR-nen zee meer dahs BIT-teh air-KLAIR-en" },
      { de: "Ich weiß nicht, wie man das sagt.", en: "I don't know how to say that.", pron: "ikh vice nikht vee mahn dahs zahkt" },
      { de: "Können Sie mir ein Beispiel geben?", en: "Can you give me an example?", pron: "KUR-nen zee meer ine BY-shpeel GAY-ben" },
      { de: "Wie spricht man dieses Wort aus?", en: "How do you pronounce this word?", pron: "vee shprikht mahn DEE-zes vort ows" },
      { de: "Ich habe das Wort vergessen.", en: "I forgot the word.", pron: "ikh HAH-beh dahs vort fer-GESS-en" },
      { de: "Es liegt mir auf der Zunge.", en: "It's on the tip of my tongue.", pron: "ess leekt meer owf dair TSOON-geh" },
      { de: "Ich muss mein Deutsch verbessern.", en: "I need to improve my German.", pron: "ikh moos mine doytch fer-BESS-ern" },
      { de: "Habe ich das richtig gesagt?", en: "Did I say that correctly?", pron: "HAH-beh ikh dahs RIKH-tikh geh-ZAHKT" },
      { de: "Korrigieren Sie mich bitte.", en: "Please correct me.", pron: "ko-ree-GEE-ren zee mikh BIT-teh" },
      { de: "Wie sagt man das umgangssprachlich?", en: "How do you say that colloquially?", pron: "vee zahkt mahn dahs OOM-gahngs-shprahkh-likh" },
      { de: "Ich verstehe den Unterschied nicht.", en: "I don't understand the difference.", pron: "ikh fer-SHTAY-eh dayn OON-ter-sheet nikht" },
      { de: "Können Sie bitte buchstabieren?", en: "Can you please spell it?", pron: "KUR-nen zee BIT-teh BOOKH-shtah-bee-ren" },
      { de: "Entschuldigung, mein Deutsch ist nicht perfekt.", en: "Sorry, my German isn't perfect.", pron: "ent-SHOOL-dee-goong mine doytch ist nikht per-FEKT" },
      { de: "Ich übe jeden Tag Deutsch.", en: "I practice German every day.", pron: "ikh EW-beh YAY-den tahk doytch" },
      { de: "Können Sie das einfacher erklären?", en: "Can you explain that more simply?", pron: "KUR-nen zee dahs INE-fah-kher air-KLAIR-en" },
      { de: "Danke für Ihre Geduld.", en: "Thank you for your patience.", pron: "DAHN-keh fyoor EE-reh geh-DOOLT" },
    ],
  },
  {
    id: "practical",
    title: "Practical Life",
    emoji: "🛒",
    sentences: [
      { de: "Geld", en: "money", pron: "gelt" },
      { de: "Preis", en: "price", pron: "pryce" },
      { de: "Rechnung", en: "bill / check", pron: "REKH-noong" },
      { de: "Kasse", en: "register / checkout", pron: "KAH-seh" },
      { de: "Laden", en: "shop / store", pron: "LAH-den" },
      { de: "Supermarkt", en: "supermarket", pron: "ZOO-per-markt" },
      { de: "Apotheke", en: "pharmacy", pron: "ah-poh-TAY-keh" },
      { de: "Krankenhaus", en: "hospital", pron: "KRAHN-ken-hows" },
      { de: "Polizei", en: "police", pron: "poh-lee-TSY" },
      { de: "Bahnhof", en: "train station", pron: "BAHN-hof" },
      { de: "Flughafen", en: "airport", pron: "FLOOG-hah-fen" },
      { de: "Hotel", en: "hotel", pron: "hoh-TEL" },
      { de: "Restaurant", en: "restaurant", pron: "res-toh-RAHNG" },
      { de: "Toilette", en: "bathroom / toilet", pron: "twah-LET-eh" },
      { de: "Straße", en: "street", pron: "SHTRAH-seh" },
      { de: "Wasser", en: "water", pron: "VAH-ser" },
      { de: "Essen", en: "food", pron: "ESS-en" },
      { de: "Trinken", en: "drink", pron: "TRIN-ken" },
      { de: "Schlüssel", en: "key", pron: "SHLEW-sel" },
      { de: "Handy", en: "cell phone", pron: "HEN-dee" },
      { de: "Wie viel kostet das?", en: "How much does that cost?", pron: "vee feel KOS-tet dahs" },
      { de: "Ich hätte gern …", en: "I would like …", pron: "ikh HET-teh gairn" },
      { de: "Die Rechnung, bitte.", en: "The check, please.", pron: "dee REKH-noong BIT-teh" },
      { de: "Wo ist die Toilette?", en: "Where is the bathroom?", pron: "voh ist dee twah-LET-eh" },
      { de: "Wo ist der Bahnhof?", en: "Where is the train station?", pron: "voh ist dair BAHN-hof" },
      { de: "Ich suche …", en: "I'm looking for …", pron: "ikh ZOO-kheh" },
      { de: "Wie spät ist es?", en: "What time is it?", pron: "vee shpayt ist ess" },
      { de: "Haben Sie Zeit?", en: "Do you have time?", pron: "HAH-ben zee tsite" },
      { de: "Ich weiß nicht.", en: "I don't know.", pron: "ikh vice nikht" },
      { de: "Einen Moment, bitte.", en: "One moment, please.", pron: "EYE-nen mo-MENT BIT-teh" },
      { de: "Das ist gut.", en: "That's good.", pron: "dahs ist goot" },
      { de: "Ich bin fertig.", en: "I'm done / finished.", pron: "ikh bin FAIR-tikh" },
      { de: "Kann ich mit Karte zahlen?", en: "Can I pay by card?", pron: "kahn ikh mit KAR-teh TSAH-len" },
      { de: "Nur bar.", en: "Cash only.", pron: "noor bar" },
      { de: "Haben Sie das in einer anderen Größe?", en: "Do you have that in another size?", pron: "HAH-ben zee dahs in EYE-ner AHN-der-en GRUR-seh" },
      { de: "Wo kann ich das finden?", en: "Where can I find that?", pron: "voh kahn ikh dahs FIN-den" },
      { de: "Das ist zu teuer.", en: "That's too expensive.", pron: "dahs ist tsoo TOY-er" },
      { de: "Gibt es einen Rabatt?", en: "Is there a discount?", pron: "gipt ess EYE-nen rah-BAHT" },
      { de: "Ich brauche eine Quittung.", en: "I need a receipt.", pron: "ikh BROW-kheh EYE-neh kvee-TOONG" },
      { de: "Wo ist der Ausgang?", en: "Where is the exit?", pron: "voh ist dair OWS-gahng" },
      { de: "Entschuldigung, wo ist die nächste U-Bahn-Station?", en: "Excuse me, where is the nearest subway station?", pron: "ent-SHOOL-dee-goong voh ist dee NEKH-steh OO-bahn-shtah-TSEE-ohn" },
      { de: "Ich möchte einen Tisch für zwei Personen reservieren.", en: "I'd like to reserve a table for two.", pron: "ikh MURKH-teh EYE-nen tish fyoor tsvy pair-ZOH-nen reh-zer-VEE-ren" },
      { de: "Können Sie mir den Weg zum Bahnhof zeigen?", en: "Can you show me the way to the train station?", pron: "KUR-nen zee meer dayn vayk tsoom BAHN-hof TSY-gen" },
      { de: "Ich habe eine Reservierung auf den Namen …", en: "I have a reservation under the name …", pron: "ikh HAH-beh EYE-neh reh-zer-VEE-roong owf dayn NAH-men" },
      { de: "Was empfehlen Sie?", en: "What do you recommend?", pron: "vahs emp-FAY-len zee" },
      { de: "Ich bin allergisch gegen …", en: "I'm allergic to …", pron: "ikh bin ah-LAIR-gish GAY-gen" },
      { de: "Könnte ich bitte die Speisekarte haben?", en: "Could I have the menu please?", pron: "KURN-teh ikh BIT-teh dee SHPY-zeh-kar-teh HAH-ben" },
      { de: "Gibt es hier kostenloses WLAN?", en: "Is there free WiFi here?", pron: "gipt ess heer KOS-ten-loh-zes VAY-lahn" },
      { de: "Wo kann ich ein Taxi nehmen?", en: "Where can I get a taxi?", pron: "voh kahn ikh ine TAHK-see NAY-men" },
      { de: "Wie komme ich zum Flughafen?", en: "How do I get to the airport?", pron: "vee KOM-eh ikh tsoom FLOOG-hah-fen" },
      { de: "Ich brauche einen Arzt.", en: "I need a doctor.", pron: "ikh BROW-kheh EYE-nen artst" },
      { de: "Wo ist die nächste Apotheke?", en: "Where is the nearest pharmacy?", pron: "voh ist dee NEKH-steh ah-poh-TAY-keh" },
      { de: "Ich habe mein Handy verloren.", en: "I lost my cell phone.", pron: "ikh HAH-beh mine HEN-dee fer-LOH-ren" },
      { de: "Können Sie mir ein gutes Restaurant empfehlen?", en: "Can you recommend a good restaurant to me?", pron: "KUR-nen zee meer ine GOO-tes res-toh-RAHNG emp-FAY-len" },
      { de: "Ich möchte einchecken, bitte.", en: "I'd like to check in, please.", pron: "ikh MURKH-teh INE-chek-en BIT-teh" },
      { de: "Wann fährt der nächste Zug nach Berlin?", en: "When does the next train to Berlin leave?", pron: "vahn fairt dair NEKH-steh tsook nahkh ber-LEEN" },
      { de: "Eine Fahrkarte nach München, bitte.", en: "A ticket to Munich, please.", pron: "EYE-neh FAR-kar-teh nahkh MEWN-khen BIT-teh" },
      { de: "Ist dieser Platz frei?", en: "Is this seat free?", pron: "ist DEE-zer plahts fry" },
      { de: "Ich möchte das zurückgeben.", en: "I'd like to return this.", pron: "ikh MURKH-teh dahs tsoo-REWK-gay-ben" },
      { de: "Das Essen war ausgezeichnet.", en: "The food was excellent.", pron: "dahs ESS-en vahr OWS-geh-tsykh-net" },
    ],
  },
  {
    id: "pronouns",
    title: "Pronouns & People",
    emoji: "👤",
    sentences: [
      { de: "ich", en: "I", pron: "ikh" },
      { de: "du", en: "you (informal)", pron: "doo" },
      { de: "er", en: "he", pron: "air" },
      { de: "sie", en: "she / they", pron: "zee" },
      { de: "es", en: "it", pron: "ess" },
      { de: "wir", en: "we", pron: "veer" },
      { de: "ihr", en: "you all / her", pron: "eer" },
      { de: "Sie", en: "you (formal)", pron: "zee" },
      { de: "mein", en: "my", pron: "mine" },
      { de: "dein", en: "your (informal)", pron: "dine" },
      { de: "sein", en: "his", pron: "zine" },
      { de: "ihr", en: "her / their", pron: "eer" },
      { de: "unser", en: "our", pron: "OON-zer" },
      { de: "euer", en: "your (plural)", pron: "OY-er" },
      { de: "Ihr", en: "your (formal)", pron: "eer" },
      { de: "mich", en: "me (accusative)", pron: "mikh" },
      { de: "dich", en: "you (accusative)", pron: "dikh" },
      { de: "ihn", en: "him", pron: "een" },
      { de: "uns", en: "us", pron: "oons" },
      { de: "euch", en: "you all (accusative)", pron: "oykh" },
      { de: "mir", en: "to me (dative)", pron: "meer" },
      { de: "dir", en: "to you (dative)", pron: "deer" },
      { de: "ihm", en: "to him", pron: "eem" },
      { de: "ihr", en: "to her", pron: "eer" },
      { de: "ihnen", en: "to them", pron: "EE-nen" },
      { de: "man", en: "one / people (generic)", pron: "mahn" },
      { de: "jemand", en: "someone", pron: "YAY-mahnt" },
      { de: "niemand", en: "no one", pron: "NEE-mahnt" },
      { de: "alle", en: "everyone / all", pron: "AH-leh" },
      { de: "selbst", en: "self", pron: "zelpst" },
      { de: "Das bin ich.", en: "That's me.", pron: "dahs bin ikh" },
      { de: "Das ist er.", en: "That's him.", pron: "dahs ist air" },
      { de: "Das sind wir.", en: "That's us.", pron: "dahs zint veer" },
      { de: "Das gehört mir.", en: "That belongs to me.", pron: "dahs geh-HURT meer" },
      { de: "Das ist meins.", en: "That's mine.", pron: "dahs ist mines" },
      { de: "Das ist deins.", en: "That's yours.", pron: "dahs ist dines" },
      { de: "Wer ist das?", en: "Who is that?", pron: "vair ist dahs" },
      { de: "Das ist für dich.", en: "That's for you.", pron: "dahs ist fyoor dikh" },
      { de: "Das ist für Sie.", en: "That's for you (formal).", pron: "dahs ist fyoor zee" },
      { de: "Jeder weiß das.", en: "Everyone knows that.", pron: "YAY-der vice dahs" },
      { de: "Niemand war da.", en: "Nobody was there.", pron: "NEE-mahnt vahr dah" },
      { de: "Alle sind eingeladen.", en: "Everyone is invited.", pron: "AH-leh zint INE-geh-lah-den" },
      { de: "Man sagt, dass …", en: "People say that …", pron: "mahn zahkt dahs" },
      { de: "Ich selbst.", en: "Myself.", pron: "ikh zelpst" },
      { de: "Unter uns gesagt.", en: "Between us.", pron: "OON-ter oons geh-ZAHKT" },
      { de: "Ich habe das alleine gemacht.", en: "I did that alone.", pron: "ikh HAH-beh dahs ah-LY-neh geh-MAHKHT" },
      { de: "Er hat mir das gesagt.", en: "He told me that.", pron: "air hat meer dahs geh-ZAHKT" },
      { de: "Sie hat das Buch gelesen.", en: "She read the book.", pron: "zee hat dahs bookh geh-LAY-zen" },
      { de: "Wir haben uns lange nicht gesehen.", en: "We haven't seen each other in a long time.", pron: "veer HAH-ben oons LAHN-geh nikht geh-ZAY-en" },
      { de: "Könnt ihr das für mich machen?", en: "Can you guys do that for me?", pron: "kurnt eer dahs fyoor mikh MAH-khen" },
      { de: "Ich habe es ihm gegeben.", en: "I gave it to him.", pron: "ikh HAH-beh ess eem geh-GAY-ben" },
      { de: "Das ist nicht mein Problem.", en: "That's not my problem.", pron: "dahs ist nikht mine pro-BLEM" },
      { de: "Dein Kaffee wird kalt.", en: "Your coffee is getting cold.", pron: "dine KAH-fay veert kahlt" },
      { de: "Unser Haus ist nicht weit von hier.", en: "Our house isn't far from here.", pron: "OON-zer hows ist nikht vite fon heer" },
      { de: "Jemand hat angerufen.", en: "Someone called.", pron: "YAY-mahnt hat AHN-geh-roo-fen" },
      { de: "Niemand versteht mich.", en: "Nobody understands me.", pron: "NEE-mahnt fer-SHTAYT mikh" },
      { de: "Haben Sie sich schon entschieden?", en: "Have you already decided? (formal)", pron: "HAH-ben zee zikh shohn ent-SHEE-den" },
      { de: "Er denkt nur an sich selbst.", en: "He only thinks about himself.", pron: "air denkt noor ahn zikh zelpst" },
      { de: "Das muss jeder selbst wissen.", en: "Everyone has to know that for themselves.", pron: "dahs moos YAY-der zelpst VISS-en" },
      { de: "Wir helfen uns gegenseitig.", en: "We help each other.", pron: "veer HEL-fen oons GAY-gen-zy-tikh" },
    ],
  },
  {
    id: "verbs",
    title: "Essential Verbs",
    emoji: "⚡",
    sentences: [
      { de: "sein", en: "to be", pron: "zine" },
      { de: "haben", en: "to have", pron: "HAH-ben" },
      { de: "werden", en: "to become / will", pron: "VAIR-den" },
      { de: "können", en: "can / to be able to", pron: "KUR-nen" },
      { de: "müssen", en: "must / to have to", pron: "MUSS-en" },
      { de: "wollen", en: "to want", pron: "VOL-en" },
      { de: "sollen", en: "should / supposed to", pron: "ZOL-en" },
      { de: "dürfen", en: "may / to be allowed to", pron: "DEWR-fen" },
      { de: "machen", en: "to do / make", pron: "MAH-khen" },
      { de: "gehen", en: "to go", pron: "GAY-en" },
      { de: "kommen", en: "to come", pron: "KOM-en" },
      { de: "sehen", en: "to see", pron: "ZAY-en" },
      { de: "geben", en: "to give", pron: "GAY-ben" },
      { de: "sagen", en: "to say", pron: "ZAH-gen" },
      { de: "nehmen", en: "to take", pron: "NAY-men" },
      { de: "wissen", en: "to know (a fact)", pron: "VISS-en" },
      { de: "kennen", en: "to know (a person/place)", pron: "KEN-en" },
      { de: "brauchen", en: "to need", pron: "BROW-khen" },
      { de: "denken", en: "to think", pron: "DEN-ken" },
      { de: "glauben", en: "to believe", pron: "GLOW-ben" },
      { de: "finden", en: "to find", pron: "FIN-den" },
      { de: "stehen", en: "to stand", pron: "SHTAY-en" },
      { de: "liegen", en: "to lie / be situated", pron: "LEE-gen" },
      { de: "sitzen", en: "to sit", pron: "ZIT-sen" },
      { de: "laufen", en: "to run / walk", pron: "LOW-fen" },
      { de: "fahren", en: "to drive / travel", pron: "FAH-ren" },
      { de: "fliegen", en: "to fly", pron: "FLEE-gen" },
      { de: "essen", en: "to eat", pron: "ESS-en" },
      { de: "trinken", en: "to drink", pron: "TRIN-ken" },
      { de: "schlafen", en: "to sleep", pron: "SHLAH-fen" },
      { de: "arbeiten", en: "to work", pron: "AR-by-ten" },
      { de: "spielen", en: "to play", pron: "SHPEE-len" },
      { de: "lernen", en: "to learn", pron: "LAIR-nen" },
      { de: "lesen", en: "to read", pron: "LAY-zen" },
      { de: "schreiben", en: "to write", pron: "SHRY-ben" },
      { de: "sprechen", en: "to speak", pron: "SHPRE-khen" },
      { de: "hören", en: "to hear", pron: "HUR-en" },
      { de: "kaufen", en: "to buy", pron: "KOW-fen" },
      { de: "verkaufen", en: "to sell", pron: "fer-KOW-fen" },
      { de: "bezahlen", en: "to pay", pron: "beh-TSAH-len" },
      { de: "verstehen", en: "to understand", pron: "fer-SHTAY-en" },
      { de: "versuchen", en: "to try", pron: "fer-ZOO-khen" },
      { de: "helfen", en: "to help", pron: "HEL-fen" },
      { de: "bringen", en: "to bring", pron: "BRING-en" },
      { de: "legen", en: "to lay / put", pron: "LAY-gen" },
      { de: "öffnen", en: "to open", pron: "URF-nen" },
      { de: "schließen", en: "to close", pron: "SHLEE-sen" },
      { de: "anfangen", en: "to begin", pron: "AHN-fahng-en" },
      { de: "aufhören", en: "to stop", pron: "OWF-hur-en" },
      { de: "warten", en: "to wait", pron: "VAR-ten" },
      { de: "Ich bin müde.", en: "I'm tired.", pron: "ikh bin MEW-deh" },
      { de: "Ich habe Hunger.", en: "I'm hungry.", pron: "ikh HAH-beh HOONG-er" },
      { de: "Ich muss gehen.", en: "I have to go.", pron: "ikh moos GAY-en" },
      { de: "Ich will das.", en: "I want that.", pron: "ikh vil dahs" },
      { de: "Ich kann das.", en: "I can do that.", pron: "ikh kahn dahs" },
      { de: "Ich denke schon.", en: "I think so.", pron: "ikh DEN-keh shohn" },
      { de: "Ich weiß es nicht.", en: "I don't know.", pron: "ikh vice ess nikht" },
      { de: "Ich verstehe.", en: "I understand.", pron: "ikh fer-SHTAY-eh" },
      { de: "Ich brauche das.", en: "I need that.", pron: "ikh BROW-kheh dahs" },
      { de: "Ich versuche es.", en: "I'll try.", pron: "ikh fer-ZOO-kheh ess" },
      { de: "Ich muss morgen früh aufstehen.", en: "I have to get up early tomorrow.", pron: "ikh moos MOR-gen frew OWF-shtay-en" },
      { de: "Kannst du mir bitte helfen?", en: "Can you please help me?", pron: "kahnst doo meer BIT-teh HEL-fen" },
      { de: "Wir müssen uns beeilen.", en: "We need to hurry.", pron: "veer MEWS-en oons beh-EYE-len" },
      { de: "Ich habe vergessen, einzukaufen.", en: "I forgot to go shopping.", pron: "ikh HAH-beh fer-GESS-en INE-tsoo-kow-fen" },
      { de: "Er arbeitet jeden Tag von neun bis fünf.", en: "He works every day from nine to five.", pron: "air AR-by-tet YAY-den tahk fon noyn bis fewnf" },
      { de: "Sie liest gerade ein interessantes Buch.", en: "She's currently reading an interesting book.", pron: "zee leest geh-RAH-deh ine in-teh-reh-SAHN-tes bookh" },
      { de: "Wir fahren nächste Woche in den Urlaub.", en: "We're going on vacation next week.", pron: "veer FAH-ren NEKH-steh VO-kheh in dayn OOR-lowp" },
      { de: "Ich esse gerne Pizza.", en: "I like eating pizza.", pron: "ikh ESS-eh GAIR-neh PEET-sah" },
      { de: "Hast du schon die E-Mail geschrieben?", en: "Have you already written the email?", pron: "hahst doo shohn dee EE-male geh-SHREE-ben" },
      { de: "Ich versuche, jeden Tag Deutsch zu üben.", en: "I try to practice German every day.", pron: "ikh fer-ZOO-kheh YAY-den tahk doytch tsoo EW-ben" },
    ],
  },
  {
    id: "connectors",
    title: "Connectors & Questions",
    emoji: "🔗",
    sentences: [
      { de: "ja", en: "yes", pron: "yah" },
      { de: "nein", en: "no", pron: "nine" },
      { de: "nicht", en: "not", pron: "nikht" },
      { de: "auch", en: "also", pron: "owkh" },
      { de: "nur", en: "only", pron: "noor" },
      { de: "noch", en: "still / another", pron: "nokh" },
      { de: "schon", en: "already", pron: "shohn" },
      { de: "sehr", en: "very", pron: "zair" },
      { de: "wie", en: "how / like", pron: "vee" },
      { de: "was", en: "what", pron: "vahs" },
      { de: "wer", en: "who", pron: "vair" },
      { de: "wo", en: "where", pron: "voh" },
      { de: "wann", en: "when", pron: "vahn" },
      { de: "warum", en: "why", pron: "vah-ROOM" },
      { de: "weil", en: "because", pron: "vile" },
      { de: "aber", en: "but", pron: "AH-ber" },
      { de: "und", en: "and", pron: "oont" },
      { de: "oder", en: "or", pron: "OH-der" },
      { de: "wenn", en: "if / when", pron: "ven" },
      { de: "dass", en: "that (conjunction)", pron: "dahs" },
      { de: "obwohl", en: "although", pron: "op-VOHL" },
      { de: "trotzdem", en: "nevertheless", pron: "TROTS-daym" },
      { de: "deshalb", en: "therefore", pron: "DESS-hahlp" },
      { de: "denn", en: "because / for", pron: "den" },
      { de: "also", en: "so / therefore", pron: "AHL-zoh" },
      { de: "sondern", en: "but rather", pron: "ZON-dern" },
      { de: "sowohl", en: "both", pron: "zoh-VOHL" },
      { de: "weder", en: "neither", pron: "VAY-der" },
      { de: "entweder", en: "either", pron: "ent-VAY-der" },
      { de: "außerdem", en: "furthermore", pron: "OW-ser-daym" },
      { de: "vielleicht", en: "maybe", pron: "fee-LYKHT" },
      { de: "bestimmt", en: "certainly", pron: "beh-SHTIMT" },
      { de: "wahrscheinlich", en: "probably", pron: "vahr-SHINE-likh" },
      { de: "eigentlich", en: "actually", pron: "EYE-gent-likh" },
      { de: "übrigens", en: "by the way", pron: "EW-bree-gens" },
      { de: "jedenfalls", en: "in any case", pron: "YAY-den-fahls" },
      { de: "immer", en: "always", pron: "IM-er" },
      { de: "nie", en: "never", pron: "nee" },
      { de: "manchmal", en: "sometimes", pron: "MAHNKH-mahl" },
      { de: "oft", en: "often", pron: "oft" },
      { de: "Ja, genau.", en: "Yes, exactly.", pron: "yah geh-NOW" },
      { de: "Nein, leider nicht.", en: "No, unfortunately not.", pron: "nine LY-der nikht" },
      { de: "Ich auch.", en: "Me too.", pron: "ikh owkh" },
      { de: "Ich auch nicht.", en: "Me neither.", pron: "ikh owkh nikht" },
      { de: "Nicht nur … sondern auch …", en: "Not only … but also …", pron: "nikht noor ... ZON-dern owkh" },
      { de: "Entweder … oder …", en: "Either … or …", pron: "ent-VAY-der ... OH-der" },
      { de: "Weder … noch …", en: "Neither … nor …", pron: "VAY-der ... nokh" },
      { de: "Sowohl … als auch …", en: "Both … and …", pron: "zoh-VOHL ... ahls owkh" },
      { de: "Je mehr, desto besser.", en: "The more, the better.", pron: "yeh mair DES-toh BESS-er" },
      { de: "Auf der einen Seite …", en: "On the one hand …", pron: "owf dair EYE-nen ZY-teh" },
      { de: "Ich weiß nicht, ob das stimmt.", en: "I don't know if that's true.", pron: "ikh vice nikht op dahs shtimt" },
      { de: "Obwohl es regnet, gehe ich spazieren.", en: "Although it's raining, I'm going for a walk.", pron: "op-VOHL ess RAYG-net GAY-eh ikh shpah-TSEE-ren" },
      { de: "Er kommt nicht, weil er krank ist.", en: "He's not coming because he's sick.", pron: "air komt nikht vile air krahnk ist" },
      { de: "Ich denke, dass das eine gute Idee ist.", en: "I think that's a good idea.", pron: "ikh DEN-keh dahs dahs EYE-neh GOO-teh ee-DAY ist" },
      { de: "Wenn du willst, können wir gehen.", en: "If you want, we can go.", pron: "ven doo vilst KUR-nen veer GAY-en" },
      { de: "Es ist nicht teuer, sondern billig.", en: "It's not expensive, but rather cheap.", pron: "ess ist nikht TOY-er ZON-dern BIL-ikh" },
      { de: "Ich komme trotzdem.", en: "I'm coming anyway.", pron: "ikh KOM-eh TROTS-daym" },
      { de: "Vielleicht können wir morgen gehen.", en: "Maybe we can go tomorrow.", pron: "fee-LYKHT KUR-nen veer MOR-gen GAY-en" },
      { de: "Wahrscheinlich hat er recht.", en: "He's probably right.", pron: "vahr-SHINE-likh hat air rekht" },
      { de: "Eigentlich wollte ich zu Hause bleiben.", en: "Actually I wanted to stay home.", pron: "EYE-gent-likh VOL-teh ikh tsoo HOW-zeh BLY-ben" },
    ],
  },
  {
    id: "function-words",
    title: "Daily Function Words",
    emoji: "🧩",
    sentences: [
      { de: "mit", en: "with", pron: "mit" },
      { de: "für", en: "for", pron: "fyoor" },
      { de: "von", en: "from / of", pron: "fon" },
      { de: "bei", en: "at / near / with", pron: "bye" },
      { de: "hier", en: "here", pron: "heer" },
      { de: "dort", en: "there", pron: "dort" },
      { de: "nach", en: "after / to", pron: "nahkh" },
      { de: "vor", en: "before / in front of", pron: "for" },
      { de: "über", en: "over / about", pron: "EW-ber" },
      { de: "unter", en: "under", pron: "OON-ter" },
      { de: "neben", en: "next to", pron: "NAY-ben" },
      { de: "zwischen", en: "between", pron: "TSVI-shen" },
      { de: "hinter", en: "behind", pron: "HIN-ter" },
      { de: "in", en: "in", pron: "in" },
      { de: "an", en: "at / on", pron: "ahn" },
      { de: "auf", en: "on / upon", pron: "owf" },
      { de: "aus", en: "out of / from", pron: "ows" },
      { de: "seit", en: "since", pron: "zite" },
      { de: "bis", en: "until", pron: "bis" },
      { de: "ohne", en: "without", pron: "OH-neh" },
      { de: "gegen", en: "against", pron: "GAY-gen" },
      { de: "durch", en: "through", pron: "doorkh" },
      { de: "um", en: "around / at (time)", pron: "oom" },
      { de: "zu", en: "to / too", pron: "tsoo" },
      { de: "jetzt", en: "now", pron: "yetst" },
      { de: "heute", en: "today", pron: "HOY-teh" },
      { de: "morgen", en: "tomorrow", pron: "MOR-gen" },
      { de: "gestern", en: "yesterday", pron: "GESS-tern" },
      { de: "immer", en: "always", pron: "IM-er" },
      { de: "nie", en: "never", pron: "nee" },
      { de: "dann", en: "then", pron: "dahn" },
      { de: "da", en: "there / since", pron: "dah" },
      { de: "etwas", en: "something", pron: "ET-vahs" },
      { de: "nichts", en: "nothing", pron: "nikhts" },
      { de: "alles", en: "everything", pron: "AH-les" },
      { de: "Hier bitte.", en: "Here, please.", pron: "heer BIT-teh" },
      { de: "Da drüben.", en: "Over there.", pron: "dah DREW-ben" },
      { de: "Nach links.", en: "To the left.", pron: "nahkh links" },
      { de: "Nach rechts.", en: "To the right.", pron: "nahkh rekhts" },
      { de: "Geradeaus.", en: "Straight ahead.", pron: "geh-RAH-deh-ows" },
      { de: "In der Nähe.", en: "Nearby.", pron: "in dair NAY-eh" },
      { de: "Weit weg.", en: "Far away.", pron: "vite vek" },
      { de: "Ab und zu.", en: "Now and then.", pron: "ahp oont tsoo" },
      { de: "Vor kurzem.", en: "Recently.", pron: "for KOORTS-em" },
      { de: "Von Anfang an.", en: "From the beginning.", pron: "fon AHN-fahng ahn" },
      { de: "Bis jetzt.", en: "Until now.", pron: "bis yetst" },
      { de: "Ohne Zweifel.", en: "Without a doubt.", pron: "OH-neh TSVY-fel" },
      { de: "Um die Ecke.", en: "Around the corner.", pron: "oom dee EK-eh" },
      { de: "Auf keinen Fall.", en: "No way.", pron: "owf KY-nen fahl" },
      { de: "Auf jeden Fall.", en: "Definitely.", pron: "owf YAY-den fahl" },
      { de: "Ich gehe jetzt nach Hause.", en: "I'm going home now.", pron: "ikh GAY-eh yetst nahkh HOW-zeh" },
      { de: "Das Geschäft ist um die Ecke.", en: "The shop is around the corner.", pron: "dahs geh-SHEFT ist oom dee EK-eh" },
      { de: "Seit wann wohnst du hier?", en: "Since when have you been living here?", pron: "zite vahn vohnst doo heer" },
      { de: "Ich bin ohne mein Handy unterwegs.", en: "I'm out without my phone.", pron: "ikh bin OH-neh mine HEN-dee OON-ter-vayks" },
      { de: "Wir treffen uns vor dem Kino.", en: "We're meeting in front of the cinema.", pron: "veer TREF-en oons for daym KEE-noh" },
      { de: "Das Restaurant ist zwischen der Bank und der Post.", en: "The restaurant is between the bank and the post office.", pron: "dahs res-toh-RAHNG ist TSVI-shen dair bahnk oont dair post" },
      { de: "Ich habe nichts dagegen.", en: "I have nothing against it.", pron: "ikh HAH-beh nikhts dah-GAY-gen" },
      { de: "Heute Abend habe ich Zeit.", en: "I have time this evening.", pron: "HOY-teh AH-bent HAH-beh ikh tsite" },
      { de: "Gestern war ich den ganzen Tag unterwegs.", en: "Yesterday I was out all day.", pron: "GESS-tern vahr ikh dayn GAHN-tsen tahk OON-ter-vayks" },
      { de: "Morgen muss ich früh aufstehen.", en: "Tomorrow I have to get up early.", pron: "MOR-gen moos ikh frew OWF-shtay-en" },
    ],
  },
  {
    id: "smooth-operator",
    title: "Smooth Operator",
    emoji: "😎",
    sentences: [
      { de: "cool", en: "cool", pron: "kool" },
      { de: "krass", en: "crazy / awesome", pron: "krahs" },
      { de: "geil", en: "awesome (slang)", pron: "gile" },
      { de: "super", en: "super / great", pron: "ZOO-per" },
      { de: "toll", en: "great", pron: "tol" },
      { de: "prima", en: "great / first-rate", pron: "PREE-mah" },
      { de: "klasse", en: "fantastic", pron: "KLAH-seh" },
      { de: "Quatsch", en: "nonsense", pron: "kvahtch" },
      { de: "Mist", en: "darn / crap", pron: "mist" },
      { de: "blöd", en: "stupid / annoying", pron: "blurd" },
      { de: "egal", en: "whatever / doesn't matter", pron: "eh-GAHL" },
      { de: "echt", en: "really / genuine", pron: "ekht" },
      { de: "total", en: "totally", pron: "toh-TAHL" },
      { de: "halt", en: "just / simply (filler)", pron: "hahlt" },
      { de: "quasi", en: "basically / like", pron: "KVAH-zee" },
      { de: "Alles gut.", en: "It's all good. / No worries.", pron: "AH-les goot" },
      { de: "Alles gut?", en: "Everything okay?", pron: "AH-les goot" },
      { de: "Passt schon.", en: "It's fine. / Don't worry about it.", pron: "pahst shohn" },
      { de: "Kein Ding.", en: "No biggie.", pron: "kine ding" },
      { de: "Schon gut.", en: "It's alright.", pron: "shohn goot" },
      { de: "Macht nichts.", en: "Doesn't matter.", pron: "makht nikhts" },
      { de: "Ja ja, alles gut.", en: "Yeah yeah, it's fine.", pron: "yah yah AH-les goot" },
      { de: "Lass mal.", en: "Forget it. / Don't bother.", pron: "lahs mahl" },
      { de: "Na und?", en: "So what?", pron: "nah oont" },
      { de: "Egal.", en: "Whatever.", pron: "eh-GAHL" },
      { de: "Läuft.", en: "Things are going well.", pron: "loyft" },
      { de: "Geht klar.", en: "Got it. / No problem.", pron: "gayt klahr" },
      { de: "Echt jetzt?", en: "Seriously? / For real?", pron: "ekht yetst" },
      { de: "Keine Ahnung.", en: "No idea.", pron: "KY-neh AH-noong" },
      { de: "Das war's.", en: "That's it. / That's all.", pron: "dahs vahrs" },
      { de: "Geschenkt.", en: "Don't mention it. / It's nothing.", pron: "geh-SHENKT" },
      { de: "Mach dir keinen Stress.", en: "Don't stress yourself.", pron: "mahkh deer KY-nen shtress" },
      { de: "Ich bin dabei.", en: "I'm in. / Count me in.", pron: "ikh bin dah-BY" },
      { de: "Mal sehen.", en: "We'll see.", pron: "mahl ZAY-en" },
      { de: "Sag Bescheid.", en: "Let me know.", pron: "zahk beh-SHYTE" },
      { de: "Das ist mir total egal.", en: "I really don't care.", pron: "dahs ist meer toh-TAHL eh-GAHL" },
      { de: "Mach dir keine Sorgen, das wird schon.", en: "Don't worry, it'll be fine.", pron: "mahkh deer KY-neh ZOR-gen dahs veert shohn" },
      { de: "Das ist doch kein Problem.", en: "That's no problem at all.", pron: "dahs ist dokh kine pro-BLEM" },
      { de: "Lass uns einfach sehen, was passiert.", en: "Let's just see what happens.", pron: "lahs oons INE-fahkh ZAY-en vahs pah-SEERT" },
      { de: "Ich bin total entspannt.", en: "I'm totally relaxed.", pron: "ikh bin toh-TAHL ent-SHPAHNT" },
      { de: "Du machst das schon.", en: "You'll manage. / You got this.", pron: "doo mahkst dahs shohn" },
      { de: "Kein Stress, wir haben genug Zeit.", en: "No stress, we have enough time.", pron: "kine shtress veer HAH-ben geh-NOOK tsite" },
      { de: "Ich kümmere mich darum.", en: "I'll take care of it.", pron: "ikh KEWM-er-eh mikh dah-ROOM" },
      { de: "Hätte schlimmer sein können.", en: "Could have been worse.", pron: "HET-teh SHLIM-er zine KUR-nen" },
      { de: "Das regeln wir schon.", en: "We'll sort that out.", pron: "dahs RAY-geln veer shohn" },
      { de: "Komm mal runter.", en: "Calm down.", pron: "kom mahl ROON-ter" },
      { de: "Das hast du gut gemacht.", en: "You did well.", pron: "dahs hahst doo goot geh-MAHKHT" },
      { de: "Ich steh voll dahinter.", en: "I'm fully behind it.", pron: "ikh shtay fol dah-HIN-ter" },
      { de: "Das geht schon klar.", en: "That'll be fine.", pron: "dahs gayt shohn klahr" },
      { de: "Sei nicht so hart zu dir selbst.", en: "Don't be so hard on yourself.", pron: "zy nikht zoh hart tsoo deer zelpst" },
    ],
  },
  {
    id: "song-words",
    title: "Song Words",
    emoji: "🎵",
    sentences: [
      { de: "tragen", en: "to wear / to carry", pron: "TRAH-gen" },
      { de: "guck mal", en: "look / check it out", pron: "gook mahl" },
      { de: "die Hosentasche", en: "the pants pocket", pron: "dee HOH-zen-tah-sheh" },
      { de: "der Schmuck", en: "the jewelry", pron: "dair shmook" },
      { de: "der Hals", en: "the neck", pron: "dair hahls" },
      { de: "der Duft", en: "the scent / fragrance", pron: "dair dooft" },
      { de: "das Hemd", en: "the shirt", pron: "dahs hemt" },
      { de: "die Sorgen", en: "the worries", pron: "dee ZOR-gen" },
      { de: "weniger", en: "less / fewer", pron: "VAY-nee-ger" },
      { de: "neugeboren", en: "newborn / reborn", pron: "NOY-geh-boh-ren" },
      { de: "einfach", en: "easy / simple", pron: "INE-fahkh" },
      { de: "unterwegs", en: "on the way / out and about", pron: "oon-ter-VAYKS" },
      { de: "bestellen", en: "to order", pron: "beh-SHTEL-en" },
      { de: "die Zähne", en: "the teeth", pron: "dee TSAY-neh" },
      { de: "deshalb", en: "therefore / that's why", pron: "DESS-hahlp" },
      { de: "deswegen", en: "for that reason", pron: "DESS-vay-gen" },
      { de: "der Zettel", en: "the note / slip of paper", pron: "dair TSET-el" },
      { de: "das Glas", en: "the glass", pron: "dahs glahs" },
      { de: "der Arm", en: "the arm", pron: "dair arm" },
      { de: "Zeit ist Geld.", en: "Time is money.", pron: "tsite ist gelt" },
    ],
  },
  {
    id: "animals",
    title: "Animals (Tiere)",
    emoji: "🐾",
    sentences: [
      { de: "der Hund", en: "the dog", pron: "dair hoont" },
      { de: "die Katze", en: "the cat", pron: "dee KAH-tseh" },
      { de: "der Fisch", en: "the fish", pron: "dair fish" },
      { de: "der Vogel", en: "the bird", pron: "dair FOH-gel" },
      { de: "die Kuh", en: "the cow", pron: "dee koo" },
      { de: "das Schwein", en: "the pig", pron: "dahs shvine" },
      { de: "die Maus", en: "the mouse", pron: "dee mows" },
      { de: "das Pferd", en: "the horse", pron: "dahs pfairt" },
      { de: "der Flügel", en: "the wing", pron: "dair FLEW-gel" },
      { de: "das Tier", en: "the animal", pron: "dahs teer" },
    ],
  },
  {
    id: "body",
    title: "Body (Körper)",
    emoji: "🧍",
    sentences: [
      { de: "der Kopf", en: "the head", pron: "dair kopf" },
      { de: "der Hals", en: "the neck", pron: "dair hahls" },
      { de: "das Gesicht", en: "the face", pron: "dahs geh-ZIKHT" },
      { de: "das Auge", en: "the eye", pron: "dahs OW-geh" },
      { de: "der Mund", en: "the mouth", pron: "dair moont" },
      { de: "die Nase", en: "the nose", pron: "dee NAH-zeh" },
      { de: "der Zahn", en: "the tooth", pron: "dair tsahn" },
      { de: "das Ohr", en: "the ear", pron: "dahs ohr" },
      { de: "die Hand", en: "the hand", pron: "dee hahnt" },
      { de: "der Fuß", en: "the foot", pron: "dair foos" },
      { de: "der Arm", en: "the arm", pron: "dair arm" },
      { de: "das Bein", en: "the leg", pron: "dahs bine" },
      { de: "das Herz", en: "the heart", pron: "dahs hairts" },
      { de: "das Haar", en: "the hair", pron: "dahs hahr" },
      { de: "das Blut", en: "the blood", pron: "dahs bloot" },
    ],
  },
  {
    id: "food-drink",
    title: "Food & Beverages (Essen & Getränke)",
    emoji: "🍽️",
    sentences: [
      { de: "das Ei", en: "the egg", pron: "dahs eye" },
      { de: "der Käse", en: "the cheese", pron: "dair KAY-zeh" },
      { de: "das Brot", en: "the bread", pron: "dahs broht" },
      { de: "das Hähnchen", en: "the chicken", pron: "dahs HAYN-khen" },
      { de: "der Apfel", en: "the apple", pron: "dair AHP-fel" },
      { de: "die Banane", en: "the banana", pron: "dee bah-NAH-neh" },
      { de: "der Reis", en: "the rice", pron: "dair rice" },
      { de: "das Salz", en: "the salt", pron: "dahs zahlts" },
      { de: "der Zucker", en: "the sugar", pron: "dair TSOO-ker" },
      { de: "das Messer", en: "the knife", pron: "dahs MESS-er" },
      { de: "die Gabel", en: "the fork", pron: "dee GAH-bel" },
      { de: "der Löffel", en: "the spoon", pron: "dair LURF-el" },
      { de: "der Teller", en: "the plate", pron: "dair TEL-er" },
      { de: "der Kaffee", en: "the coffee", pron: "dair KAH-fay" },
      { de: "der Tee", en: "the tea", pron: "dair tay" },
      { de: "der Wein", en: "the wine", pron: "dair vine" },
      { de: "das Bier", en: "the beer", pron: "dahs beer" },
      { de: "das Wasser", en: "the water", pron: "dahs VAH-ser" },
      { de: "die Milch", en: "the milk", pron: "dee milkh" },
      { de: "der Saft", en: "the juice", pron: "dair zahft" },
    ],
  },
];

const TOTAL_SENTENCES = PACKS.reduce((s, p) => s + p.sentences.length, 0);

// ─── Storage helpers ────────────────────────────────────────────────────
const STORAGE_KEY = "sprachflow-data";

const defaultData = () => ({
  ratings: {},
  reps: {},
  totalReps: 0,
});

const loadData = async () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultData();
  } catch {
    return defaultData();
  }
};

const saveData = async (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Save failed", e);
  }
};

// ─── TTS ────────────────────────────────────────────────────────────────
const speak = (text, lang = "de-DE") => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = 0.85;
  const voices = window.speechSynthesis.getVoices();
  const v = voices.find((v) => v.lang.startsWith(lang.split("-")[0]));
  if (v) u.voice = v;
  window.speechSynthesis.speak(u);
};

// ─── Star Rating ────────────────────────────────────────────────────────
const Stars = ({ rating, onRate, size = 20 }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        onClick={(e) => {
          e.stopPropagation();
          onRate(n);
        }}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: size,
          color: n <= rating ? "#F59E0B" : "#D1D5DB",
          padding: 0,
          lineHeight: 1,
          transition: "transform 0.15s",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.2)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      >
        ★
      </button>
    ))}
  </div>
);

// ─── Sentence Card ──────────────────────────────────────────────────────
const SentenceCard = ({ item, index, mode, rating, onRate, onSpeak }) => {
  const [revealed, setRevealed] = useState(false);
  const isListenMode = mode === "listen";
  const primary = isListenMode ? item.de : item.en;
  const hidden = isListenMode ? item.en : item.de;

  return (
    <div
      onClick={() => setRevealed(!revealed)}
      style={{
        background: "#fff",
        borderRadius: 14,
        padding: "16px 18px",
        marginBottom: 12,
        borderLeft: `4px solid ${rating >= 5 ? "#10B981" : rating >= 3 ? "#3B82F6" : "#E5E7EB"}`,
        cursor: "pointer",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        transition: "all 0.2s",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSpeak(item.de);
            }}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "1.5px solid #3B82F6",
              background: "rgba(59,130,246,0.06)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              color: "#3B82F6",
              flexShrink: 0,
            }}
          >
            🔊
          </button>
          <span style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 600 }}>#{index + 1}</span>
        </div>
        <Stars rating={rating} onRate={onRate} size={18} />
      </div>

      <div style={{ marginLeft: 42 }}>
        <div style={{ fontSize: 17, fontWeight: 600, color: "#1F2937", marginBottom: 4 }}>{primary}</div>
        {revealed ? (
          <div style={{ animation: "fadeIn 0.25s ease" }}>
            <div style={{ fontSize: 15, color: "#3B82F6", fontWeight: 500 }}>{hidden}</div>
            <div style={{ fontSize: 13, color: "#9CA3AF", fontStyle: "italic", marginTop: 2 }}>{item.pron}</div>
          </div>
        ) : (
          <div style={{ fontSize: 13, color: "#6EE7B7", fontStyle: "italic", cursor: "pointer" }}>Tap to reveal…</div>
        )}
      </div>
    </div>
  );
};

// ─── Main App ───────────────────────────────────────────────────────────
export default function SprachFlow() {
  const [view, setView] = useState("home"); // home | pack | progress
  const [activePack, setActivePack] = useState(null);
  const [mode, setMode] = useState("listen"); // listen | recall
  const [data, setData] = useState(defaultData());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData().then((d) => {
      setData(d);
      setLoading(false);
    });
    // preload voices
    window.speechSynthesis?.getVoices();
  }, []);

  const persist = useCallback(
    (updater) => {
      setData((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        saveData(next);
        return next;
      });
    },
    []
  );

  const rateItem = (packId, idx, stars) => {
    const key = `${packId}:${idx}`;
    persist((prev) => ({
      ...prev,
      ratings: { ...prev.ratings, [key]: stars },
      reps: { ...prev.reps, [key]: (prev.reps[key] || 0) + 1 },
      totalReps: prev.totalReps + 1,
    }));
  };

  const getRating = (packId, idx) => data.ratings[`${packId}:${idx}`] || 0;

  // Stats
  const practiced = new Set(Object.keys(data.reps)).size;
  const mastered = Object.values(data.ratings).filter((r) => r >= 5).length;
  const totalReps = data.totalReps;

  const getMasteredInPack = (pack) =>
    pack.sentences.filter((_, i) => getRating(pack.id, i) >= 5).length;

  const getProgressInPack = (pack) =>
    pack.sentences.filter((_, i) => getRating(pack.id, i) > 0).length;

  const resetProgress = () => {
    persist(defaultData());
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#F8FAFC", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🇩🇪</div>
          <div style={{ color: "#6B7280", fontSize: 14 }}>Loading…</div>
        </div>
      </div>
    );
  }

  // ─── Progress View ──────────────────────────────────────────────────
  if (view === "progress") {
    return (
      <div style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap'); @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>

        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #1E3A5F 0%, #0F2942 100%)", padding: "20px 20px 28px", color: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <button onClick={() => setView("home")} style={{ background: "rgba(255,255,255,0.12)", border: "none", borderRadius: 10, width: 36, height: 36, cursor: "pointer", color: "#fff", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Your Progress</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Track your learning journey</div>
            </div>
          </div>

          {/* Stat boxes */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[
              { label: "Practiced", value: practiced, color: "#60A5FA" },
              { label: "Reps", value: totalReps, color: "#A78BFA" },
              { label: "Mastered", value: mastered, color: "#34D399" },
            ].map((s) => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: "14px 10px", textAlign: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: 20 }}>
          {/* Overall progress bar */}
          <div style={{ background: "#fff", borderRadius: 14, padding: 18, marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#1F2937" }}>Overall Mastery</span>
              <span style={{ fontSize: 13, color: "#6B7280" }}>{mastered} / {TOTAL_SENTENCES}</span>
            </div>
            <div style={{ height: 10, background: "#E5E7EB", borderRadius: 5, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(mastered / TOTAL_SENTENCES) * 100}%`, background: "linear-gradient(90deg, #3B82F6, #10B981)", borderRadius: 5, transition: "width 0.5s" }} />
            </div>
            <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 6 }}>{Math.round((mastered / TOTAL_SENTENCES) * 100)}% complete</div>
          </div>

          {/* Per-pack breakdown */}
          {PACKS.map((pack) => {
            const m = getMasteredInPack(pack);
            const p = getProgressInPack(pack);
            return (
              <div key={pack.id} style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", marginBottom: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{pack.emoji} {pack.title}</span>
                  <span style={{ fontSize: 12, color: "#6B7280" }}>{m}/{pack.sentences.length} ★</span>
                </div>
                <div style={{ height: 6, background: "#E5E7EB", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(p / pack.sentences.length) * 100}%`, background: m === pack.sentences.length ? "#10B981" : "#3B82F6", borderRadius: 3, transition: "width 0.4s" }} />
                </div>
              </div>
            );
          })}

          {/* Tip */}
          {practiced > 0 && mastered < practiced && (
            <div style={{ background: "#FEF3C7", borderRadius: 12, padding: 16, marginTop: 12, display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 18 }}>💡</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#92400E" }}>Keep practicing!</div>
                <div style={{ fontSize: 12, color: "#A16207" }}>You have {practiced - mastered} items rated below 5 stars. Review them in Active Recall mode to lock them in.</div>
              </div>
            </div>
          )}

          {/* Reset */}
          <button onClick={resetProgress} style={{ marginTop: 20, width: "100%", padding: 12, background: "none", border: "1.5px solid #E5E7EB", borderRadius: 10, color: "#9CA3AF", fontSize: 13, cursor: "pointer", fontWeight: 500 }}>
            Reset All Progress
          </button>
        </div>
      </div>
    );
  }

  // ─── Pack View (Practice) ─────────────────────────────────────────────
  if (view === "pack" && activePack) {
    const pack = PACKS.find((p) => p.id === activePack);
    if (!pack) return null;
    const m = getMasteredInPack(pack);
    const p = getProgressInPack(pack);

    return (
      <div style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap'); @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>

        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #1E3A5F 0%, #0F2942 100%)", padding: "16px 20px 20px", color: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button onClick={() => { setView("home"); setActivePack(null); }} style={{ background: "rgba(255,255,255,0.12)", border: "none", borderRadius: 10, width: 36, height: 36, cursor: "pointer", color: "#fff", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700 }}>{pack.emoji} {pack.title}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>🇩🇪 German · {pack.sentences.length} sentences</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {[
                { label: "Practiced", value: p },
                { label: "Mastered", value: m },
              ].map((s) => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: "6px 10px", textAlign: "center", minWidth: 48 }}>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{s.value}</div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12 }}>
            <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.15)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(m / pack.sentences.length) * 100}%`, background: "#10B981", borderRadius: 3, transition: "width 0.4s" }} />
            </div>
            <span style={{ color: "rgba(255,255,255,0.6)" }}>{Math.round((m / pack.sentences.length) * 100)}%</span>
          </div>
        </div>

        {/* Mode toggle */}
        <div style={{ padding: "14px 20px 0" }}>
          <div style={{ display: "flex", background: "#E5E7EB", borderRadius: 10, padding: 3, marginBottom: 14 }}>
            {[
              { key: "listen", label: "🎧 Listen & Repeat", tip: "Hear German first" },
              { key: "recall", label: "🧠 Active Recall", tip: "Translate from English" },
            ].map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                style={{
                  flex: 1,
                  padding: "10px 8px",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "inherit",
                  background: mode === m.key ? "#fff" : "transparent",
                  color: mode === m.key ? "#1E3A5F" : "#9CA3AF",
                  boxShadow: mode === m.key ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                  transition: "all 0.2s",
                }}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 14, textAlign: "center" }}>
            {mode === "listen" ? "Listen to the German, then tap to see the English meaning." : "See the English — try to say it in German before revealing."}
          </div>
        </div>

        {/* Cards */}
        <div style={{ padding: "0 20px 100px" }}>
          {pack.sentences.map((item, i) => (
            <SentenceCard
              key={i}
              item={item}
              index={i}
              mode={mode}
              rating={getRating(pack.id, i)}
              onRate={(stars) => rateItem(pack.id, i, stars)}
              onSpeak={(text) => speak(text)}
            />
          ))}
        </div>

        {/* Bottom play bar */}
        <div style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid #E5E7EB",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}>
          <button
            onClick={() => {
              pack.sentences.forEach((s, i) => {
                setTimeout(() => speak(s.de), i * 2500);
              });
            }}
            style={{
              background: "linear-gradient(135deg, #3B82F6, #1E3A5F)",
              border: "none",
              borderRadius: 50,
              width: 48,
              height: 48,
              cursor: "pointer",
              color: "#fff",
              fontSize: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 14px rgba(59,130,246,0.35)",
            }}
          >
            ▶
          </button>
          <div style={{ fontSize: 12, color: "#6B7280" }}>Play all sentences</div>
        </div>
      </div>
    );
  }

  // ─── Home View ────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap'); @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } } @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .6; } }`}</style>

      {/* Hero header */}
      <div style={{
        background: "linear-gradient(135deg, #1E3A5F 0%, #0F2942 60%, #163350 100%)",
        padding: "28px 24px 32px",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: "rgba(59,130,246,0.08)" }} />
        <div style={{ position: "absolute", bottom: -20, left: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(16,185,129,0.06)" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #3B82F6, #10B981)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700 }}>S</div>
          <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>
            <span style={{ color: "#60A5FA" }}>Sprach</span><span>Flow</span>
          </span>
        </div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", margin: "8px 0 0", lineHeight: 1.5 }}>
          Practice German sentences with active recall, audio, and self-rating — on web or mobile.
        </p>

        {/* Quick stats bar */}
        <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
          {[
            { label: "Sentences", value: TOTAL_SENTENCES, icon: "📝" },
            { label: "Mastered", value: mastered, icon: "⭐" },
            { label: "Reps", value: totalReps, icon: "🔁" },
          ].map((s) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 14 }}>{s.icon}</span>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{s.value}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: 0.3 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px 20px 24px" }}>
        {/* Method cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
          {[
            { icon: "🎧", title: "Listen & Repeat", desc: "Hear German, shadow the audio", color: "#EFF6FF", border: "#BFDBFE" },
            { icon: "🧠", title: "Active Recall", desc: "Translate from English aloud", color: "#F0FDF4", border: "#BBF7D0" },
          ].map((c) => (
            <div key={c.title} style={{ background: c.color, border: `1.5px solid ${c.border}`, borderRadius: 14, padding: 16 }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{c.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1F2937", marginBottom: 2 }}>{c.title}</div>
              <div style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.4 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        {/* Section: Sentence Packs */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1F2937", margin: 0 }}>🏝️ Language Islands</h2>
          <button onClick={() => setView("progress")} style={{ background: "none", border: "none", color: "#3B82F6", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            📊 Progress →
          </button>
        </div>

        {PACKS.map((pack) => {
          const m = getMasteredInPack(pack);
          const p = getProgressInPack(pack);
          return (
            <div
              key={pack.id}
              onClick={() => {
                setActivePack(pack.id);
                setView("pack");
              }}
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: "16px 18px",
                marginBottom: 10,
                cursor: "pointer",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                transition: "transform 0.15s, box-shadow 0.15s",
                borderLeft: m === pack.sentences.length ? "4px solid #10B981" : "4px solid #E5E7EB",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ fontSize: 26 }}>{pack.emoji}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#1F2937" }}>{pack.title}</div>
                    <div style={{ fontSize: 12, color: "#9CA3AF" }}>{pack.sentences.length} sentences · {m} mastered</div>
                  </div>
                </div>
                <span style={{ color: "#D1D5DB", fontSize: 18 }}>›</span>
              </div>
              {p > 0 && (
                <div style={{ marginTop: 10, height: 5, background: "#F3F4F6", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(m / pack.sentences.length) * 100}%`, background: m === pack.sentences.length ? "#10B981" : "#3B82F6", borderRadius: 3, transition: "width 0.4s" }} />
                </div>
              )}
            </div>
          );
        })}

        {/* Daily routine tip */}
        <div style={{ background: "#fff", borderRadius: 14, padding: 18, marginTop: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1F2937", marginBottom: 6 }}>⏱️ Daily Routine</div>
          <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6 }}>
            Just 15 minutes a day. Listen & Repeat first, then Active Recall. Rate yourself honestly — 5 stars means you can say it without thinking.
          </div>
        </div>
      </div>
    </div>
  );
}
