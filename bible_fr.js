// Bible Française — Louis Segond (Domaine Public)
// Abreviasyon kreyòl → nom fransè
const MAP_LIVRE = {
  "Jen":"Genèse","Egz":"Exode","Lev":"Lévitique","Nom":"Nombres",
  "Dèt":"Deutéronome","Joz":"Josué","Jij":"Juges","Rout":"Ruth",
  "1Sm":"1 Samuel","2Sm":"2 Samuel","1Wa":"1 Rois","2Wa":"2 Rois",
  "Sòm":"Psaumes","Pwov":"Proverbes","Ebre":"Hébreux",
  "Efe":"Éphésiens","Fil":"Philippiens","Jan":"Jean","Apo":"Apocalypse"
};

const BIBLE_FR = {
  "Genèse": {
    "1":  {"1":"Au commencement, Dieu créa les cieux et la terre.","2":"La terre était informe et vide; les ténèbres couvraient l'abîme, et l'esprit de Dieu se mouvait au-dessus des eaux.","3":"Dieu dit: Que la lumière soit! Et la lumière fut.","4":"Dieu vit que la lumière était bonne; et Dieu sépara la lumière d'avec les ténèbres.","5":"Dieu appela la lumière jour, et il appela les ténèbres nuit. Ce fut le premier jour.","26":"Dieu dit: Faisons l'homme à notre image, selon notre ressemblance.","27":"Dieu créa l'homme à son image, il créa l'homme et la femme.","28":"Dieu les bénit: Soyez féconds, multipliez, remplissez la terre.","31":"Dieu vit tout ce qu'il avait fait et voilà, c'était très bon."},
    "2":  {"1":"Ainsi furent achevés les cieux et la terre, et toute leur armée.","3":"Dieu bénit le septième jour, et il le sanctifia.","7":"L'Éternel Dieu forma l'homme de la poussière de la terre, il souffla dans ses narines un souffle de vie.","18":"Il n'est pas bon que l'homme soit seul; je lui ferai une aide semblable à lui.","24":"L'homme quittera son père et sa mère, et s'attachera à sa femme, et ils deviendront une seule chair."},
    "3":  {"1":"Le serpent était le plus rusé de tous les animaux des champs.","6":"La femme vit que l'arbre était bon à manger et agréable à la vue.","15":"Je mettrai inimitié entre toi et la femme; celle-ci t'écrasera la tête."},
    "12": {"1":"L'Éternel dit à Abram: Va-t-en de ton pays dans le pays que je te montrerai.","2":"Je ferai de toi une grande nation, et je te bénirai.","3":"Toutes les familles de la terre seront bénies en toi."},
    "22": {"1":"Après ces choses, Dieu mit Abraham à l'épreuve.","8":"Abraham répondit: Dieu se pourvoira lui-même de l'agneau pour l'holocauste.","14":"Abraham appela ce lieu: L'Éternel pourvoira."},
    "37": {"4":"Ses frères virent que leur père l'aimait plus que tous ses frères, et ils le prirent en haine.","5":"Joseph eut un songe, et il le raconta à ses frères."},
    "39": {"2":"L'Éternel était avec Joseph, et il fut un homme qui réussissait dans tout.","21":"L'Éternel fut avec Joseph, lui accorda sa grâce et le fit trouver faveur."},
    "45": {"5":"Ne vous affligez pas de m'avoir vendu; car c'est pour vous sauver que Dieu m'a envoyé ici.","7":"Dieu m'a envoyé avant vous pour vous conserver des descendants sur la terre."},
    "50": {"20":"Vous aviez médité de me faire du mal: Dieu l'a changé en bien pour sauver un peuple nombreux."}
  },
  "Exode": {
    "3":  {"4":"L'Éternel vit qu'il détournait les yeux pour regarder; Dieu l'appela du milieu du buisson.","5":"N'approche pas d'ici, ôte tes sandales, car le lieu est une terre sainte.","14":"Dieu dit à Moïse: Je suis celui qui suis. C'est ainsi que tu répondras: JE SUIS m'a envoyé."},
    "14": {"13":"Ne craignez pas, l'Éternel combattra pour vous; et vous, gardez le silence.","21":"Moïse étendit sa main sur la mer. L'Éternel refoula la mer par un vent d'orient."},
    "20": {"2":"Je suis l'Éternel, ton Dieu, qui t'ai fait sortir du pays d'Égypte.","3":"Tu n'auras pas d'autres dieux devant ma face.","7":"Tu ne prendras point le nom de l'Éternel, ton Dieu, en vain.","8":"Souviens-toi du jour du repos, pour le sanctifier.","12":"Honore ton père et ta mère, afin que tes jours se prolongent.","13":"Tu ne commettras point de meurtre.","14":"Tu ne commettras point d'adultère.","15":"Tu ne déroberas point."},
    "28": {"1":"Fais approcher Aaron ton frère, et ses fils avec lui, du milieu des enfants d'Israël.","3":"Tu parleras à tous ceux dont le cœur est sage, à qui j'ai donné un esprit de sagesse."},
    "32": {"26":"Moïse se tint à la porte du camp et dit: Qui est pour l'Éternel? Que tous viennent vers moi!"},
    "33": {"11":"L'Éternel parlait à Moïse face à face, comme un homme parle à son ami.","14":"L'Éternel dit: Je marcherai moi-même avec toi, et je te donnerai le repos."},
    "34": {"6":"L'Éternel, l'Éternel, Dieu miséricordieux et compatissant, lent à la colère, riche en bonté et en fidélité."}
  },
  "Lévitique": {
    "19": {"2":"Parle à toute l'assemblée des enfants d'Israël, et dis-leur: Vous serez saints, car je suis saint, moi, l'Éternel votre Dieu.","18":"Tu aimeras ton prochain comme toi-même. Je suis l'Éternel."},
    "26": {"3":"Si vous suivez mes lois et si vous observez mes commandements et les mettez en pratique.","4":"Je vous donnerai vos pluies en leur saison, la terre donnera ses produits.","12":"Je marcherai au milieu de vous, je serai votre Dieu, et vous serez mon peuple."}
  },
  "Nombres": {
    "6":  {"24":"Que l'Éternel te bénisse et te garde!","25":"Que l'Éternel fasse luire sa face sur toi et t'accorde sa grâce!","26":"Que l'Éternel tourne sa face vers toi et te donne la paix!"},
    "14": {"18":"L'Éternel est lent à la colère et riche en bonté, pardonnant l'iniquité et la transgression."}
  },
  "Deutéronome": {
    "6":  {"4":"Écoute, Israël! L'Éternel, notre Dieu, est le seul Éternel.","5":"Tu aimeras l'Éternel, ton Dieu, de tout ton cœur, de toute ton âme et de toute ta force.","6":"Ces commandements que je te donne aujourd'hui seront dans ton cœur.","7":"Tu les inculqueras à tes enfants et tu en parleras quand tu seras dans ta maison."},
    "28": {"1":"Si tu obéis à la voix de l'Éternel, il te mettra au-dessus de toutes les nations.","2":"Toutes ces bénédictions se réaliseront pour toi si tu obéis.","6":"Béni seras-tu à ton arrivée, et béni seras-tu à ton départ."},
    "29": {"29":"Les choses cachées sont à l'Éternel, notre Dieu; les choses révélées sont à nous et à nos enfants."},
    "30": {"19":"J'ai mis devant toi la vie et la mort, la bénédiction et la malédiction. Choisis la vie!"},
    "31": {"6":"Fortifiez-vous et ayez du courage! L'Éternel marchera lui-même avec toi.","8":"L'Éternel lui-même marchera devant toi; il ne te délaissera point et ne t'abandonnera point."},
    "32": {"4":"Il est le Rocher; ses œuvres sont parfaites. Dieu est fidèle et sans iniquité."},
    "33": {"27":"Le Dieu d'éternité est un refuge, et sous tes bras sont des bras éternels."},
    "34": {"10":"Il ne s'est plus levé en Israël de prophète semblable à Moïse."}
  },
  "Josué": {
    "1":  {"7":"Fortifie-toi et aie beaucoup de courage pour agir fidèlement.","8":"Que ce livre de la loi ne s'éloigne point de ta bouche; médite-le jour et nuit.","9":"Ne t'effraie point, car l'Éternel, ton Dieu, est avec toi dans tout ce que tu feras."},
    "24": {"15":"Si vous ne voulez pas servir l'Éternel, choisissez aujourd'hui qui vous voulez servir. Moi et ma maison, nous servirons l'Éternel."}
  },
  "Juges": {
    "4":  {"14":"Baraq, lève-toi car voici le jour où l'Éternel livre Sisera entre tes mains."},
    "7":  {"7":"L'Éternel dit à Gédéon: Je vous sauverai avec les trois cents hommes."}
  },
  "Ruth": {
    "1":  {"16":"Là où tu iras, j'irai; là où tu t'arrêteras, je m'arrêterai.","17":"Là où tu mourras, je mourrai."}
  },
  "1 Samuel": {
    "16": {"7":"L'homme regarde à l'apparence, mais l'Éternel regarde au cœur."},
    "17": {"45":"Tu viens à moi avec une épée; moi, je viens à toi au nom de l'Éternel des armées.","47":"L'Éternel ne sauve point avec l'épée et la lance, car la guerre appartient à l'Éternel."}
  },
  "2 Samuel": {
    "7":  {"12":"Quand tes jours seront accomplis, j'élèverai ta postérité après toi.","16":"Ta maison et ton royaume seront assurés à jamais devant toi."},
    "22": {"2":"L'Éternel est mon rocher, ma forteresse, et celui qui me délivre.","29":"Tu es ma lampe, ô Éternel! L'Éternel éclaire mes ténèbres."}
  },
  "1 Rois": {
    "3":  {"9":"Accorde à ton serviteur un cœur intelligent pour juger ton peuple.","12":"Voici, j'agis selon ta parole. Je te donne un cœur sage et intelligent."},
    "19": {"12":"Après le feu, il y eut une voix douce et suave."}
  },
  "2 Rois": {
    "5":  {"14":"Naaman descendit et se plongea sept fois dans le Jourdain. Sa chair redevint comme la chair d'un jeune enfant."},
    "22": {"19":"Parce que ton cœur a été attendri et que tu t'es humilié, j'ai aussi entendu, dit l'Éternel."}
  },
  "Psaumes": {
    "1":  {"1":"Heureux l'homme qui ne marche pas selon le conseil des méchants.","2":"Il trouve sa joie dans la loi de l'Éternel, et la médite jour et nuit.","3":"Il est comme un arbre planté près d'un courant d'eau.","6":"L'Éternel connaît la voie des justes; la voie des méchants mène à la ruine."},
    "23": {"1":"L'Éternel est mon berger: je ne manquerai de rien.","2":"Il me fait reposer dans de verts pâturages, il me dirige près des eaux paisibles.","3":"Il restaure mon âme, il me conduit dans les sentiers de la justice.","4":"Quand je marche dans la vallée de l'ombre de la mort, je ne crains aucun mal, car tu es avec moi.","5":"Tu dresses devant moi une table, en face de mes adversaires; ma coupe déborde.","6":"Certainement la bonté et la grâce m'accompagneront tous les jours de ma vie."},
    "27": {"1":"L'Éternel est ma lumière et mon salut: de qui aurais-je crainte?","14":"Espère en l'Éternel! Fortifie-toi et que ton cœur se raffermisse!"},
    "34": {"7":"L'ange de l'Éternel campe autour de ceux qui le craignent, et il les délivre.","8":"Sentez et voyez combien l'Éternel est bon! Heureux l'homme qui cherche en lui son refuge!","18":"L'Éternel est près de ceux qui ont le cœur brisé."},
    "46": {"1":"Dieu est pour nous un refuge et un appui, un secours qui ne manque jamais dans la détresse.","10":"Arrêtez, et sachez que je suis Dieu: je suis élevé parmi les nations."},
    "91": {"1":"Celui qui demeure sous l'abri du Très-Haut repose à l'ombre du Tout-Puissant.","2":"Mon refuge et ma forteresse, mon Dieu en qui je me confie!","4":"Il te couvrira de ses plumes; sa fidélité est un bouclier.","11":"Il ordonnera à ses anges de te garder dans toutes tes voies.","15":"Il m'invoquera, et je lui répondrai; je serai avec lui dans la détresse.","16":"Je le rassasierai de longs jours, et je lui ferai voir mon salut."},
    "103": {"2":"Mon âme, bénis l'Éternel, et n'oublie aucun de ses bienfaits!","3":"C'est lui qui pardonne toutes tes iniquités, qui guérit toutes tes maladies.","12":"Aussi loin que l'orient est éloigné de l'occident, il éloigne de nous nos transgressions."},
    "119": {"9":"Comment le jeune homme rendra-t-il pur son sentier? En se dirigeant d'après ta parole.","11":"Je serre ta parole dans mon cœur, afin de ne pas pécher contre toi.","105":"Ta parole est une lampe à mes pieds, et une lumière sur mon sentier."},
    "121": {"1":"Je lève les yeux vers les montagnes... D'où me viendra le secours?","2":"Mon secours vient de l'Éternel, qui a fait les cieux et la terre.","7":"L'Éternel te gardera de tout mal.","8":"L'Éternel gardera ton départ et ton arrivée, dès maintenant et à jamais."},
    "139": {"1":"Éternel, tu me sondes et tu me connais.","9":"Quand je prendrais les ailes de l'aurore, quand j'irais habiter à l'extrémité de la mer.","10":"Là aussi ta main me conduirait, ta droite me saisirait.","14":"Je te loue de ce que je suis une créature si merveilleuse."}
  },
  "Proverbes": {
    "3":  {"5":"Confie-toi en l'Éternel de tout ton cœur, et ne t'appuie pas sur ta sagesse.","6":"Reconnais-le dans toutes tes voies, et il aplanira tes sentiers.","9":"Honore l'Éternel avec tes richesses, et avec les prémices de tout ton revenu."},
    "8":  {"11":"Car la sagesse est préférable aux perles, et rien de ce qu'on désire n'est comparable à elle.","17":"J'aime ceux qui m'aiment, et ceux qui me cherchent me trouvent."},
    "31": {"10":"Une femme vertueuse, qui la trouvera? Elle a bien plus de valeur que les perles.","30":"La grâce est trompeuse, et la beauté est vaine; la femme qui craint l'Éternel sera louée."}
  },
  "Jean": {
    "1":  {"1":"Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu.","12":"À tous ceux qui l'ont reçue, elle a donné le pouvoir de devenir enfants de Dieu.","14":"La Parole a été faite chair, et elle a habité parmi nous, pleine de grâce et de vérité."},
    "3":  {"16":"Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.","17":"Dieu n'a pas envoyé son Fils pour juger le monde, mais pour que le monde soit sauvé par lui."},
    "10": {"10":"Je suis venu afin que les brebis aient la vie, et qu'elles soient dans l'abondance.","14":"Je suis le bon berger. Je connais mes brebis, et mes brebis me connaissent."},
    "11": {"25":"Jésus lui dit: Je suis la résurrection et la vie. Celui qui croit en moi vivra, même s'il meurt."},
    "14": {"1":"Que votre cœur ne se trouble point. Croyez en Dieu, et croyez en moi.","6":"Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi.","27":"Je vous laisse la paix, je vous donne ma paix."},
    "15": {"5":"Je suis le cep, vous êtes les sarments. Celui qui demeure en moi porte beaucoup de fruit.","7":"Si vous demeurez en moi, demandez ce que vous voudrez, et cela vous sera accordé.","13":"Il n'y a pas de plus grand amour que de donner sa vie pour ses amis."},
    "16": {"33":"Vous aurez des tribulations dans le monde; mais prenez courage, j'ai vaincu le monde."}
  },
  "Hébreux": {
    "11": {"1":"Or la foi est une ferme assurance des choses qu'on espère, une démonstration de celles qu'on ne voit pas.","6":"Sans la foi il est impossible de lui être agréable.","33":"Qui, par la foi, ont triomphé de royaumes, exercé la justice."},
    "12": {"1":"Rejetons tout fardeau et le péché, et courons avec persévérance dans la carrière qui nous est ouverte.","2":"Ayant les yeux sur Jésus, le chef et le consommateur de la foi."}
  },
  "Éphésiens": {
    "2":  {"8":"C'est par la grâce que vous êtes sauvés, par le moyen de la foi. C'est le don de Dieu.","9":"Ce n'est point par les œuvres, afin que personne ne se glorifie.","10":"Car nous sommes son ouvrage, ayant été créés en Jésus-Christ pour de bonnes œuvres."},
    "6":  {"10":"Au reste, fortifiez-vous dans le Seigneur, et par sa force toute-puissante.","11":"Revêtez-vous de toutes les armes de Dieu, afin de tenir ferme contre les ruses du diable."}
  },
  "Philippiens": {
    "4":  {"4":"Réjouissez-vous toujours dans le Seigneur; je le répète, réjouissez-vous.","6":"Ne vous inquiétez de rien; mais en toute chose faites connaître vos besoins à Dieu.","7":"La paix de Dieu, qui surpasse toute intelligence, gardera vos cœurs.","13":"Je puis tout par celui qui me fortifie.","19":"Mon Dieu pourvoira à tous vos besoins selon sa richesse."}
  },
  "Apocalypse": {
    "21": {"1":"Je vis un nouveau ciel et une nouvelle terre; car le premier ciel et la première terre avaient disparu.","3":"Voici le tabernacle de Dieu avec les hommes! Il habitera avec eux.","4":"Il essuiera toute larme de leurs yeux, et la mort ne sera plus.","5":"Voici, je fais toutes choses nouvelles."},
    "22": {"1":"Il me montra un fleuve d'eau de la vie, limpide comme du cristal.","12":"Voici, je viens bientôt, et ma rétribution est avec moi.","13":"Je suis l'alpha et l'oméga, le premier et le dernier, le commencement et la fin.","20":"Oui, je viens bientôt. Amen! Viens, Seigneur Jésus!"}
  }
};

// Jwenn vèsè pou yon referans kreyòl (ex: "Sòm 23:1-6")
function getBibleRef(ref) {
  const parts  = ref.split(' ');
  const abrev  = parts[0];
  const livre  = MAP_LIVRE[abrev] || abrev;
  if (!parts[1]) return { livre, chap:1, versets:{} };

  const chapStr = parts[1].split(':')[0];
  const chap    = chapStr;

  const book = BIBLE_FR[livre];
  if (!book) return { livre, chap, versets:{}, manque:true };
  const ch = book[chap];
  if (!ch)  return { livre, chap, versets:{}, manque:true };
  return { livre, chap, versets:ch };
}
