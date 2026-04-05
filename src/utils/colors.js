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