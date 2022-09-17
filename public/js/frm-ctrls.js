function chkFee(refN,refCpp,res)
{
    if(refN.checked==true)
        res.innerHTML="Rs."+refN.value;
        else if(refCpp.checked)
            res.innerHTML="<b>Rs."+refCpp.value+"</b>";
}

function showFee(value,res)
{
    res.innerHTML="<b>Rs."+value+"</b>";
}
function doBill()
{
    var chkD=document.querySelector("#chkD");
    var chkB=document.querySelector("#chkB");
    var chkG=document.querySelector("#chkG");
    var res=document.querySelector("#resChk");

    var bill=0;
    if(chkD.checked)
        bill+=parseInt(chkD.value);

        if(chkB.checked)
            bill+=parseInt(chkB.value);
        
        if(chkG.checked)
            bill+=parseInt(chkG.value);

            res.innerHTML="Rs."+bill;
}
function doAll()
    {
        var chkD=document.querySelector("#chkD");
        var chkB=document.querySelector("#chkB");
        var chkG=document.querySelector("#chkG");
        var chkAll=document.querySelector("#chkAll");
        

       // alert(chkAll.checked);
        chkD.checked=chkAll.checked;//used to check/uncheck all items
        chkB.checked=chkAll.checked;
        chkG.checked=chkAll.checked;

        /*if(chkAll.checked==true)
        {
            chkD.checked=true;
        }
        else
        {
            chkD.checked=false;
        }*/
    }
    function getState(ref)
    {
        alert(ref.value);
    }
    function DoShowAll()
    {
        var refCombo=document.getElementById("techs");
        var all="";
        for(var i=0;i<refCombo.length;i++)
        {
            //alert(refCombo[i].value);
            if(refCombo[i].selected==true)
                {
                    all=all+refCombo[i].value+",";
                }
        }
        document.getElementById("resTechs").innerHTML=all.substr(0,all.length-1);

    }
    function DoSelectAll()
    {
        var refCombo=document.getElementById("techs");
        for(var i=0;i<refCombo.length;i++)
        {
            refCombo[i].selected=true;
        }
    }
    function doDelete(ref)
    {
        if(confirm("R U sure?"))
           ref.remove(ref.selectedIndex) ;
    }
    function DoDelALL(ref)
    {
           ref.length=1;
    }