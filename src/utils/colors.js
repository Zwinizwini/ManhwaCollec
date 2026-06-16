export const colors = {
    violet: '#7F77DD',
    fondElem: '#1c1f27'
}

export const styleCouleur = (status) => {
    if (status === "En Cours" || status === "Hiatus") return '#378ADD'
    if (status === "Pas lu") return '#555555'
    if (status === "Drop") return '#791F1F'
    return '#1D9E75'
}

export const progressionCouleur = (prog) => {
    if (prog <= 20) return '#E24B4A'
    if (prog <= 40) return '#BA7517'
    if (prog <= 60) return '#EF9F27'
    if (prog <= 80) return '#378ADD'
    if (prog < 100) return '#1D9E75'
    return '#39FF14'
}

export const trier = (e, list) => {
    if (e === "1") {           
        list.toSorted((a,b) => {
            const noteA = a.note ? a.note : 0
            const noteB = b.note ? b.note : 0
            if (noteA < noteB) return 1
            if (noteA > noteB) return -1
            return 0
        })
    } else if (e === "2") {
        list.toSorted((a,b) => {
            const noteA = a.note ? a.note : 0
            const noteB = b.note ? b.note : 0
            if (noteA < noteB) return -1
            if (noteA > noteB) return 1
            return 0
        })
    }
}

export const allTagList = ['Military','Psychological','Time Travel','Gag Humor','Historical','Parody','Samurai','Gore','Survival','School','Childcare','Strategy Game','Mecha','Super Power',       'Medical',
  'Adult Cast','Isekai','Combat Sports','Team Sports','CGDCT','Music','Vampire','Performing Arts','Space','Iyashikei','Delinquents','Workplace','Reincarnation','Mythology','Anthropomorphic',
  'Organized Crime', 'Love Polygon','Detective','Showbiz','Urban Fantasy','Otaku Culture','Martial Arts','Love Status Quo','Racing','Mahou Shoujo','Visual Arts','Idols (Male)','Crossdressing',   'High Stakes Game',  'Reverse Harem',
  'Video Game','Magical Sex Shift','Harem','Idols (Female)','Pets','Educational','Villainess','Adventure','Drama','Fantasy','Action','Sci-Fi','Suspense','Comedy','Romance','Supernatural',  'Award Winning',
  'Mystery','Sports','Slice of Life', 'Ecchi','Gourmet','Horror','Avant Garde','Boys Love','Girls Love','Erotica','Hentai'
].sort()