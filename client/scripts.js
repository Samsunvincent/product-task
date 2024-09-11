


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
        <div>${parsed_response[i].name}</div>
        <div>${parsed_response[i].price}</div>
        <div><button onclick ="handleclick('${parsed_response[i]._id}')">view more</button></div>
        <div><button onclick ="deleteclick('${parsed_response[i]._id}')">delete</button></div>

        
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
            <div>${parsed_response.name}</div>
            <div>${parsed_response.price}</div>
           <div>${parsed_response.category}</div>
            <div>${parsed_response.use}</div>
            <div>${parsed_response.description}</div>
            <div><img src="${parsed_response.image}" alt="Image"></div>
            <div><button onclick ="updateclick('${parsed_response._id}')">update</button></div>

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


        let email = document.getElementById('email');
        email.value = user.email;


        let phone = document.getElementById('phone');
        phone.value = user.phone;


        let password = document.getElementById('password');
        password.value = user.password;




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

    } catch (error) {
        console.log("error", error);
    }
}

async function deleteclick(id){
    console.log("id from delete",id);

    try {
        let response = await fetch(`/user?id=${id}`, { method: 'DELETE' });
        console.log('fetched', response);
        let parsed_response = await response.json();
        console.log("parsed_response", parsed_response);
        
        window.location = `view-product.html`;

        if(response.status === 200){
            alert("deleted sucessfully")
        }else{
            alert("deletion failed")
        }
        
      } catch (error) {
        console.log("error", error);
        
      }


}


