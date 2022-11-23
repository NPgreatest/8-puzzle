
function output(q) {
    var text = "begin:\n";
    o=q.shift();
    while(o!= undefined){
        text+="点击第"+(o.args[0]+1).toString()+" 行，第 "+ (o.args[1]+1).toString()+" 列的方块\n ";
        1
        o = q.shift();
    }
    var blob = new Blob([text], {type: "text/plain"});
    var anchor = document.createElement("a");
    anchor.download = "output.txt";
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target = "_blank";
    anchor.style.display = "none"; // just to be safe!
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

}
