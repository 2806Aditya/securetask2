function formvalidation(){
    var name=document.getElementById("name").value;
    var age=document.getElementById("age").value;
    var email=document.getElementById("email").value;
    var address=document.getElementById("address").value;


if(name == "" || age=="" || email == "" || address==""){
    alert("all fields are necessary");
    return false;
}

else if(!email.includes("@")){
    alert("invalid email Address");
    return false;
}
    return true;
}

function showData(){
    var peoplelist;
    if(localStorage.getItem("peoplelist")==null){
        peoplelist=[];
    }
    else{
        peoplelist=JSON.parse(localStorage.getItem("peoplelist"));
    }

    var html="";
    peoplelist.forEach(function(element,index){
        html+="<tr>";
        html+="<td>" + element.name + "</td>";
        html+="<td>" + element.age + "</td>";
        html+="<td>" + element.email + "</td>";
        html+="<td>" + element.address + "</td>";
        html+='<td><button onclick="deleteData(' + index + ')" class="btn" >Delete</button><button onclick="updateData(' + index + ')" class="btn2">Edit</button></td>';
        html+="</tr>"
    });

    document.querySelector("#crudtable tbody").innerHTML=html;
}

//document.onload=showData;
document.addEventListener('DOMContentLoaded', showData);

function AddData(){
    if(formvalidation()== true){
        var name=document.getElementById("name").value;
        var age=document.getElementById("age").value;
        var email=document.getElementById("email").value;
        var address=document.getElementById("address").value;

        var peoplelist;
        if(localStorage.getItem("peoplelist")==null){
            peoplelist=[];
        }
        else{
            peoplelist=JSON.parse(localStorage.getItem("peoplelist"));
        }

        peoplelist.push({
            name:name,
            age:age,
            email:email,
            address:address,
        });

        localStorage.setItem("peoplelist", JSON.stringify(peoplelist));
        showData();
        document.getElementById("name").value="";
        document.getElementById("age").value="";
        document.getElementById("email").value="";
        document.getElementById("address").value="";
    }
}

function deleteData(index){
    var peoplelist;
        if(localStorage.getItem("peoplelist")==null){
            peoplelist=[];
        }
        else{
            peoplelist=JSON.parse(localStorage.getItem("peoplelist"));
        }

        peoplelist.splice(index,1);
        localStorage.setItem("peoplelist",JSON.stringify(peoplelist));
        showData();
}

function updateData(index){
    document.getElementById("submit").style.display="none";
    document.getElementById("update").style.display="block";

    var peoplelist;
        if(localStorage.getItem("peoplelist")==null){
            peoplelist=[];
        }
        else{
            peoplelist=JSON.parse(localStorage.getItem("peoplelist"));
        }

    document.getElementById("name").value=peoplelist[index].name;
    document.getElementById("age").value=peoplelist[index].age;
    document.getElementById("email").value=peoplelist[index].email;
    document.getElementById("address").value=peoplelist[index].address;

    document.querySelector("#update").onclick= function(){
        if(formvalidation()==true){
            peoplelist[index].name=document.getElementById("name").value;
            peoplelist[index].age=document.getElementById("age").value;
            peoplelist[index].email=document.getElementById("email").value;
            peoplelist[index].address=document.getElementById("address").value;

            localStorage.setItem("peoplelist",JSON.stringify(peoplelist));

            showData();

            document.getElementById("name").value="";
            document.getElementById("age").value="";
            document.getElementById("email").value="";
            document.getElementById("address").value="";

            document.getElementById("submit").style.display="block";
            document.getElementById("update").style.display="none ";

        }
    }
}