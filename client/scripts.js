


async function addproduct(event) {
    event.preventDefault()
    window.location = `view-product.html`

    let name = document.getElementById('name').value;

    let image = document.getElementById('image').value

    let category = document.getElementById('category').value

    let use = document.getElementById('use').value

    let description = document.getElementById('description').value

    let price = document.getElementById('price').value

    let datas = {
        name,
        image,
        category,
        price,
        use,
        description,
    };
    console.log('datas from get', datas)

    let parsed_datas = JSON.stringify(datas);
    console.log("parsed_datas", parsed_datas);

    try {
        let response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: parsed_datas
        })
        let parsed_response = await response.text();
        if (parsed_response) {
            alert('user created successfully')
        }
        else {
            alert('something went wrong')
        }
    } catch (error) {
        console.log("error", error)
    }
}

async function viewdata(event) {
    event.preventDefault();
    try {
        let response = await fetch('/submit', {
            method: 'GET',
            headers: {
                'Content-Type': 'text/plain'
            }

        })
        let parsed_response = await response.json();
        let view_container = document.getElementById('viewcontainer');

        let rows = ''

        for (i = 0; i < parsed_response.length; i++) {
            rows += `
        
        
       
            
               
            <div class="card card-block text-center ">
            <div>
                <img src="${parsed_response[i].image}"style="width:348px;height:300px;" alt="shoe"  onclick ="handleclick('${parsed_response[i]._id}')">
                    <h5 class="card-title  fw-bold fs-3 pt-3"  onclick ="handleclick('${parsed_response[i]._id}')">${parsed_response[i].name}</h5>
                    <p class=""  onclick ="handleclick('${parsed_response[i]._id}')">${parsed_response[i].description}</p>
                    <h5 class="card-title pb-3"  onclick ="handleclick('${parsed_response[i]._id}')"> $${parsed_response[i].price}</h5>
                    <div class="d-flex justify-content-between px-5 pb-4"> 
                        <div class=" px-3"><button class="w-100" onclick ="handleclick('${parsed_response[i]._id}')">view more</button></div>
                        <div><button onclick ="deleteclick('${parsed_response[i]._id}')">delete</button></div>
                    </div>
                </div>
            </div>
              
        
        `
        }
        view_container.innerHTML = rows
    } catch (error) {
        console.log('error', error);
    }
}
function handleclick(id) {
    console.log("id from handleclick", id)
    window.location = `single-product.html?id=${id}`;
}
async function singledata() {

    let params = new URLSearchParams(window.location.search);
    console.log("params", params);

    let id = params.get('id');
    console.log("id from single data", id);



    try {
        let response = await fetch(`/user?id=${id}`)
        let parsed_response = await response.json()
        console.log('parsed_response', parsed_response, typeof (parsed_response));
        // console.log(parsed_response.name, 'name');

        let container = document.getElementById('container');

        let row = `
        <div class=" container d-flex pt-5 justify-content-center align-items-center border border-4 p-5 pt-5 bg-light">
            <div><img src="${parsed_response.image} " style="width:548px;height:500px;" alt="Image"></div>
            <div class="px-5 text-center">
                <div  class="fs-1 px-5 fw-bold text-center">${parsed_response.name}</div>
                <div class="fw-bold link-danger"> $. ${parsed_response.price}</div>
                <div class="">${parsed_response.category}</div>
                <div class="">${parsed_response.use}</div>
                <div class="">${parsed_response.description}</div>
                <div><button onclick ="updateclick('${parsed_response._id}')">update</button></div>
            </div>
        </div>

        `;

        container.innerHTML = row;

    } catch (error) {
        console.log("error", error);
    }
}
function updateclick(id) {
    window.location = `update.html?id=${id}`
}
async function update() {

   

    let location = window.location
    let querystring = location.search
    let url_params = new URLSearchParams(querystring);


    let id = url_params.get('id');
    console.log('id from update', id);

    try {
        let response = await fetch(`/user?id=${id}`);
        let user = await response.json();


        console.log("user details form update", user)


        let name = document.getElementById('name');
        name.value = user.name;


        let image = document.getElementById('image');
        image.value = user.image;


        let category = document.getElementById('category');
        category.value = user.category;


        let use = document.getElementById('use');
        use.value = user.use;

        let description = document.getElementById('description');
        description.value = user.description;
        
        let price = document.getElementById('price');
        price.value = user.price;

         




    } catch (error) {
        console.log("error", error)
    }


}

async function editeddata(event) {

    event.preventDefault();

    let name = document.getElementById('name').value
    console.log("name", name)
    let image = document.getElementById('image').value
    let price = document.getElementById('price').value
    let category = document.getElementById('category').value
    let use = document.getElementById('use').value
    let description = document.getElementById('description').value

    let datas = {
        name,
        price,
        image,
        category,
        use,
        description,
    }

    let stringyfydata = JSON.stringify(datas)
    console.log("stringyfydata", stringyfydata);

    let params = new URLSearchParams(window.location.search);
    console.log("params", params);

    let id = params.get('id')
    console.log("id from update data", id);

    try {
        let response = await fetch(`/user?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: stringyfydata

        })
        let parsed_response = await response.json();
        console.log('parsed_response', parsed_response);

        if(parsed_response){
            alert("data updated successfully")
        }
        else{
            alert("updation failed")
        }
       
        window.location = 'single-product.html'

        
        
       

    } catch (error) {
        console.log("error", error);
    }
}

//delete function

async function deleteclick(id){
    console.log("id from delete",id);

    try {
        let response = await fetch(`/user?id=${id}`, { method: 'DELETE' });
        console.log('fetched', response);
        let parsed_response = await response.json();
        console.log("parsed_response", parsed_response);
        
        window.location = `view-product.html`

        if(response.status === 200){
            alert("deleted sucessfully")
        }else{
            alert("deletion failed")
        }
   

        
      } catch (error) {
        console.log("error", error);
        
      }


}


