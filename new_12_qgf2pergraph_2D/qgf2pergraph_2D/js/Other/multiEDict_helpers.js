function addEdgeToMultiEDict(dict, edgeList, eId) {
    //If the entry doesnt exist, initialize it
    if(dict[edgeList[eId].stdString()] === undefined)
        dict[edgeList[eId].stdString()] = [1,[eId]];
    //If the entry already exists, update it
    else {
        dict[edgeList[eId].stdString()][0]++;
        dict[edgeList[eId].stdString()][1].push(eId);
    }
}
/* Updates the edge dictionary after an edge removal */
/* Prereq: an edge equal to e that was removed 
    successfully from edgeList */
function removeEdgeFromMultiEDict(dict, edgeList, eStr, eId) {
    //Update corresponding dictionary entry
    dict[eStr][0]--;
    
    //Remove eId from dictionary entry
    for (let i = 0; i < dict[eStr][1].length; i++) {
        if (eId === dict[eStr][1][i]) {
            dict[eStr][1].splice(i,1);
            break;
        }
    }
    
    //Remove entry if there are no remaining edges for it
    if (dict[eStr][0] === 0)
        delete dict[eStr];
    
    //Update the eIds of all dictionary entries
    for (const [key, [count, eIds]] of Object.entries(dict))
        for (let i = 0; i < count; i++)
            if (eIds[i] > eId)
                eIds[i]--;
}