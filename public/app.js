let tierList = document.getElementsByClassName("tierList");
let retierAgents = document.getElementsByClassName("retierAgents");


Array.from(tierList).forEach(function (element) {
    element.addEventListener('click', function (event) {
        const agent = this.parentNode.childNodes[1].innerText
        fetch('/tierList', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'agent': agent,
                'tierList': false
            })
        })
            .then(response => {
                if (response.ok) return response.json()
            })
            .then(data => {
                console.log(data)
                window.location.reload(true)
            })
    });
});

Array.from(retierAgents).forEach(function (element) {
    element.addEventListener('click', function () {
        fetch('/retierAgents', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

            })
        }).then(function (response) {
            window.location.reload()
        })
    });
});