//Base buttons
document.querySelector("#devTools").onclick = ()=> parent.thisWindow.toggleDevTools(); //console.log(parent);
document.querySelector('#reload').onclick = ()=>{ parent.ipc.send('reload'); }