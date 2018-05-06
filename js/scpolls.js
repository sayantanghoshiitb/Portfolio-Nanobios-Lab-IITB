var qpPV=0; var qpHH=0;
function qp_oID(i) {return document.getElementById(i)}
function qp_oName(i) {return document.getElementsByName(i)}
function qp_oTag(i) {return document.getElementsByTagName(i)}

function qp_init() {
	var f = qp_oTag('FORM');
	try {if((document.location+'').indexOf('learnmyself.com/Poll-Preview-')!=-1 || (document.location+'').indexOf('learnmyself.com/personality.asp?p=new-poll')!=-1){qpPV=1}}catch(e){}
	try {if(qpPV==0 && (document.location+'').indexOf('.learnmyself.com/')!=-1){qpHH=1}}catch(e){}
	for(var fk=0;fk<f.length;fk++) {
		if(f[fk].id.indexOf('qp_form')!=-1 && !f[fk].initf) {
			f[fk].initf=true; var fid=f[fk].id.replace(/qp_form/i,''); var fp=f[fk].action.replace(/^[\s\S]+results([\d\w\-]+)($|[\&\?][\s\S]*?$)/i,'$1');
			var aa=qp_oID('qp_a'+fid); var bl=0; if(aa){if(aa.tagName!='A' || aa.innerHTML=='' || aa.innerHTML==' ' || aa.innerHTML=='&nbsp;' || aa.href==''){bl=1}}else{bl=1} if(bl){qp_bl(fid);return false}
			var a = qp_oName('qp_v'+fid);
			for(var k=0;k<a.length;k++){
				a[k].f=fid; a[k].fp=fp; a[k].parentNode.f=fid; a[k].parentNode.fp=fp;
				qp_ae(a[k].parentNode,'click',qp_rclick); a[k].parentNode.style.cursor='default';
			}
			qp_rclick(0,fid);
			qp_ae(f[fk],'submit',function(evt){evt=(!evt?event:evt);if(evt.preventDefault){evt.preventDefault()}evt.returnValue=false;return false;});
			var b=qp_oName('qp_b'+fid); //b[1].style.display='none';
			if(b[0]){b[0].f=fid; b[0].fp=fp; qp_ae(b[0],'click',qp_vote)}
			if(b[1]){b[1].f=fid; b[1].fp=fp; qp_ae(b[1],'click',qp_results)}
			if(!qpPV){if(qp_check(fp)){qp_results(0,fid,fp,1)}}
		}
	}
}

function qp_bl(fid) {
	return false;
	qp_oID('qp_form'+fid).style.cssText=qp_oName('qp_v'+fid)[0].parentNode.parentNode.style.cssText;
	qp_oID('qp_form'+fid).innerHTML="The code for this poll has been modified which has stopped it working correctly.<br><br>Please paste the full code back onto your site to fix the problem.";
}

function qp_ae(i,evt,fnc) {
	if(!i.attachEvent) {
		i.addEventListener(evt.replace(/^on/i,''), fnc, false);
	} else {
		i.attachEvent('on'+evt,fnc);
	}
}

function qp_rclick(evt,fid) {
	try{evt=(!evt?event:evt)}catch(e){}
	if(evt) {
		var i=(!evt.target?evt.srcElement:evt.target); fid=i.f; if(i.tagName=='A'){return true}
		if(i.tagName!='INPUT'){i.childNodes[0].checked=(i.childNodes[0].type=='radio'?true:!i.childNodes[0].checked)}
	}
	var a = qp_oName('qp_v'+fid);
	var ot = qp_oID('qp_ot'+fid); if(ot && !qp_oID('qp_main'+fid).rs){ot.style.display=(a[a.length-1].checked?'block':'none')}
}

function qp_dm(fid) {return qp_oID('qp_form'+fid).action.split('/')[2].replace(/(poll|www)[\.]/,'scripts.')}

function qp_vote(evt,fid,fp) {
	try{evt=(!evt?event:evt); var i=(!evt.target?evt.srcElement:evt.target)}catch(e){} fid=(!fid?i.f:fid); fp=(!fp?i.fp:fp);
	if(qpPV){qp_results(evt,fid,fp); return false}
	//if(qp_check(fp)){qp_results(evt,fid,fp); return false}
	var vv=''; var ov=''; var a=qp_oName('qp_v'+fid); for(var k=0;k<a.length;k++){if(a[k].checked){vv=(!vv || a[k].type=='radio'?'':vv+', ')+a[k].value}} var ot=qp_oName('qp_other'+fid)[0]; if(ot){ov=ot.value}
	qp_h(fid); var s = document.createElement("SCRIPT"); s.charset = "utf-8";
	if(fp.indexOf('-')==-1) {
		s.src = 'http://'+qp_dm(fid)+'/code/get_data.asp?d=Inventory.Poll_Vote_Inline&qp='+fp+'&v='+escape(vv)+'&o='+escape(ov)+'&tt='+(new Date()).getTime();
	} else {
		s.src = 'http://'+qp_dm(fid)+'/code/get_data.asp?d=Poll.Vote_Inline&qp='+fp+'&v='+escape(vv)+'&o='+escape(ov)+(qpHH?'&hosted=y':'')+'&tt='+(new Date()).getTime();
	}
	qp_oTag("HEAD")[0].appendChild(s);
	document.cookie=fp+"=1;expires=" + (new Date((new Date()).getTime()+(180*1000*60*60*24))).toGMTString();
}

function qp_check(fp) {var a=document.cookie.split('; '); for(var k=0;k<a.length;k++){if(a[k]==fp+'='+'1'){return true}} return false}

function qp_results(evt,fid,fp,fr) {
	try{evt=(!evt?event:evt); var i=(!evt.target?evt.srcElement:evt.target)}catch(e){} fid=(!fid?i.f:fid); fp=(!fp?i.fp:fp);
	var s = document.createElement("SCRIPT"); s.charset = "utf-8";
	if(fp.indexOf('-')==-1) {
		s.src = 'http://'+qp_dm(fid)+'/code/get_data.asp?d=Inventory.Poll_Results_'+(!qpPV?'Inline':'Fake')+'&qp='+fp+(!fr?'':'&fr=1')+'&tt='+(new Date()).getTime();
	} else {
		s.src = 'http://'+qp_dm(fid)+'/code/get_data.asp?d=Poll.Results_'+(!qpPV?'Inline':'Fake')+'&qp='+fp+(!fr?'':'&fr=1')+(qpHH?'&hosted=y':'')+'&tt='+(new Date()).getTime();
	}
	if(!fr){qp_h(fid)}
	qp_oTag("HEAD")[0].appendChild(s);
}

function qp_h(fid) {
	qp_oName('qp_b'+fid)[1].style.display='none';
	var bg=new Array();bg[0]="FF0000;0000FF;008000;FBD400;800080;f99900;9900f9;007d4d;83f400;7d0030".split(";");bg[1]="FF6464;6464FF;559F55;FFF1AA;956397;ffc364;c364ff;559f82;d8ffaa;d6518a".split(";");bg[2]="960000;000096;005A00;907300;500050;835101;4d007d;00472b;549000;50001f".split(";"); var cc=0;
	var bx = qp_oID('qp_main'+fid); if(bx.rs){return false}
	var a=qp_oName('qp_v'+fid); var bb=qp_oName('qp_b'+fid)[0].parentNode; bb.style.display='none';
	var aa=qp_oID('qp_a'+fid); if(aa){aa.style.display='none'}
	var ot=qp_oID('qp_ot'+fid); if(ot){ot.style.display='none';} qp_oID('qp_form'+fid).style.margin='0px';
	var ff = qp_oID('qp_form'+fid); ff.style.visibility='hidden';
	var ww = qp_oID('qp_ww'+fid); if(!ww) {ww = document.createElement('DIV'); ww.id='qp_ww'+fid; ww.style.position='absolute'; ww.style.marginLeft='20px'; ww.innerHTML="Please Wait..."; bx.insertBefore(ww,ff)}else{ww.style.display='block'}
	for(var k=0;k<a.length;k++) {
		a[k].style.display='none'; var ps=a[k].parentNode.style; ps.paddingLeft='0px'; ps.height='18px'; ps.overflow='hidden'; var pp=a[k].parentNode.parentNode;
		var d=document.createElement('DIV'); d.style.cssText="float:left; width:0%; font-size:11px; color:white; height:16px; text-align:right; background-color:#"+bg[0][cc]+"; border:1px solid #"+bg[2][cc]+"; border-left:1px solid #"+bg[1][cc]+"; border-top:1px solid #"+bg[1][cc]+"; background: -webkit-gradient(linear, left top, left bottom, from(#"+bg[0][cc]+"), to(#"+bg[2][cc]+")); background: -moz-linear-gradient(top, #"+bg[0][cc]+", #"+bg[2][cc]+"); filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr=#FF"+bg[0][cc]+", EndColorStr=#FF"+bg[2][cc]+"); border-bottom-right-radius:3px; border-top-right-radius:3px; padding-right:2px;";
		d=pp.appendChild(d); d.id='qp_rv_'+k+'_'+fid; cc++; cc=(cc>9?0:cc);
		var dp=document.createElement('DIV'); dp.id='qp_rp_'+k+'_'+fid; dp.style.cssText="font-size:11px; float:right; width:25px; overflow:hidden;";
		dp=pp.appendChild(dp); pp.style.paddingTop=(k==0  || !pp.attachEvent?5:0)+'px';
		if(a[k].value=='999'){var ml=document.createElement('A'); ml.id='qp_otl_'+fid; ml.innerHTML="(show)"; ml.style.color=pp.style.color; ml.style.outline='none'; ml.style.marginLeft='5px'; ml.href="javascript:qp_showot('"+fid+"');void(0);"; ml=a[k].parentNode.appendChild(ml);}
	}
	bx.rs=true; var rb=document.createElement("DIV"); rb.id='qp_rb_'+fid; rb.style.cssText=a[a.length-1].parentNode.parentNode.style.cssText+"; padding:0px; height:18px;"; rb=bb.parentNode.insertBefore(rb,bb.nextSibling); var sp=document.createElement('DIV'); sp.style.cssText='float:left; width:100px; margin-top:10px; clear:none;'; sp=rb.appendChild(sp);
	var cl=document.createElement("A"); cl.id='qp_cl_'+fid; cl.href=''; cl.target='_blank'; cl.href=qp_oID('qp_form'+fid).action; cl.innerHTML='(comments)'; cl.style.cssText=a[a.length-1].parentNode.parentNode.style.cssText+"; width:70px; float:right; display:block; clear:none; margin-top:10px; outline:none; padding:0px;"; cl=rb.appendChild(cl);
}

function qp_showot(fid) {
	var m=qp_oID('qp_main'+fid); var ot=m.ot; var rs=m.rs; var a=qp_oName('qp_v'+fid); var i=qp_oID('qp_otl_'+fid); var s=(i.innerHTML!='(show)'); i.innerHTML=(!s?'(hide)':'(show)');
	if(ot){
		var o=ot.split('|');
		for(var k=0;k<o.length;k++){
			var b=o[k].split('~'); var d=qp_oID('qp_rv_'+(a.length-1)+'_'+fid+'_o'+k).parentNode;
			var pcv=Math.round(b[1]*90/parseFloat(rs[0])); pcv=(pcv<0?0:pcv);
			d.style.display=(!s?'block':'none'); if(!s){setTimeout("qp_grow('"+d.childNodes[1].id+"',0,"+pcv+")",1)}else{d.childNodes[1].style.width='0%'}
		}
	}
}

function qp_sr(fid,c,rs,ot,fr) {
	if(fr){qp_h(fid)}
	var a=qp_oName('qp_v'+fid); rs=rs.split(','); var m=qp_oID('qp_main'+fid); m.ot=ot; m.rs=rs;
	var ff = qp_oID('qp_form'+fid); ff.style.visibility='visible';
	var ww = qp_oID('qp_ww'+fid); if(ww) {ww.style.display='none'}
	for(var k=0;k<a.length;k++) {
		var pc=parseFloat(rs[k+2])*100/parseFloat(rs[0]); var pcv=Math.round(parseFloat(rs[k+2])*90/parseFloat(rs[0])); pcv=(pcv<0?0:pcv);
		var d=qp_oID('qp_rv_'+k+'_'+fid); d.style.width=0+'%'; d.innerHTML=(rs[k+2]=='0'?'':rs[k+2]);
		qp_oID('qp_rp_'+k+'_'+fid).innerHTML=Math.round(pc)+'%'; setTimeout("qp_grow('qp_rv_"+k+"_"+fid+"',0,"+pcv+")",1);
	}
	qp_oID('qp_rb_'+fid).childNodes[0].innerHTML=rs[0]+" vote"+(rs[0]=='1'?'':'s')+" in "+rs[1]+" day"+(rs[1]=='1'?'':'s');
	if(ot){
		var o=ot.split('|');
		for(var k=0;k<o.length;k++){
			var b=o[k].split('~'); b[1]=parseFloat(b[1]); var p=a[a.length-1].parentNode.parentNode;
			var d=p.cloneNode(true); d.style.display='none';
			if(d.removeNode) {d.childNodes[0].childNodes[0].removeNode(true)} else {d.childNodes[0].removeChild(d.childNodes[0].childNodes[0])}
			d.childNodes[1].id=d.childNodes[1].id+'_o'+k;
			d.childNodes[2].id=d.childNodes[2].id+'_o'+k;
			var pc=b[1]*100/parseFloat(rs[0]); var pcv=Math.round(b[1]*90/parseFloat(rs[0])); pcv=(pcv<0?0:pcv);
			d.childNodes[0].innerHTML=b[0]; d.childNodes[1].innerHTML=b[1]; d.childNodes[2].innerHTML=Math.round(pc)+'%';
			if(k==0){d.style.marginTop='15px'} d=p.parentNode.appendChild(d);
		}
	}
	if(c){qp_oID('qp_cl_'+fid).style.display='block'}
}

function qp_grow(id,p,m) {
	p=((p=p+4)>100?100:p); qp_oID(id).style.width=Math.round(m*(p/100))+'%'; if(p<100){setTimeout("qp_grow('"+id+"',"+p+","+m+")",1)}
}

setTimeout("qp_init()",1);