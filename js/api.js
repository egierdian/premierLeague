const API_KEY = "238ff549876a4f84b9551c631b5a59b4";
const BASE_URL = "https://api.football-data.org/v2/";

const league_id = 2021; 
const ENDPOINT_TEAM = `${BASE_URL}teams`;
const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${league_id}/teams`;
const ENDPOINT_STANDINGS = `${BASE_URL}competitions/${league_id}/standings`;

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};


const getAllTeams = () => {
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    //console.log("Competition Data: " + data);
                    showTeam(data);
                })
            }
        })
    }
    fetchAPI(ENDPOINT_COMPETITION)
        .then(data => {
            showTeam(data);
        })
        .catch(error => {
            console.log(error)
        })
}

const showTeam = data => {
    let team = "";
    let teamElement =  document.getElementById("homeTeams");

    data.teams.forEach(function (article) {
        //console.log(article.id);
        team += `
            <div class="col l3 s6 m4">
                <div class="card">
                <a href="./article.html?id=${article.id}">
                    <div class="card-image">
                      <img src="${article.crestUrl}" width="200" height="200"  style="padding: 15px 10px 30px 10px;" >
                      <a  href="./article.html?id=${article.id}" class="btn-floating halfway-fab waves-effect blue darken-3"><i class="material-icons">chevron_right</i></a>
                    </div>
                    <div class="card-content" style="margin-top: -25px;">
                      <p>${article.shortName}</p>
                    </div>
                </a>
                </div>
            </div>
        `;
    });
    teamElement.innerHTML = team;
}

const getTeamById = () => {
    return new Promise((resolve,reject) => {
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");

        if ("caches" in window) {
            caches.match(ENDPOINT_TEAM + "/" + idParam).then(function (response) {
                console.log(ENDPOINT_TEAM + "/" + idParam);
                if (response) {
                    response.json().then(function (data) {
                        console.log("Team Data: " + data);
                        showTeamById(data);
                        //baru
                        resolve(data);
                    })
                }
            })
        }
        fetchAPI(ENDPOINT_TEAM + "/" + idParam)
            .then(data => {
                showTeamById(data);
                resolve(data);
            })
            .catch(error => {
                console.log(error);
            })
        });
}

const showTeamById = data => {
    let team = "";
    let squad = "";
    let teamElement =  document.getElementById("body-content");
        //console.log(data);
        data.squad.forEach(function(article){
            //console.log(article.name);
            squad += `
            <tr>
                <td width="45%">${article.name}</td>
                <td width="20%">${article.position}</td>
                <td width="35%">${article.nationality}</td>
            </tr>
            `;
        });
        
        team += `
            <div class="card">
                <div class="card-image">
                    <img class="center" src="${data.crestUrl}" width="200" height="350"  style="padding: 15px 10px 30px 10px;" >
                </div>
                <div class="card-content" style="margin-top: -25px;">
                    <table class="striped">
                    <tbody>
                        <tr>
                            <td width="50%">Name</td>
                            <td width="50%">${data.name}</td>
                        </tr>
                        <tr>
                            <td width="50%">Short Name</td>
                            <td width="50%">${data.shortName}</td>
                        </tr>
                        <tr>
                            <td width="50%">Addres</td>
                            <td width="50%">${data.address}</td>
                        </tr>
                        <tr>
                            <td width="50%">Phone</td>
                            <td width="50%">${data.phone}</td>
                        </tr>
                        <tr>
                            <td width="50%">Website</td>
                            <td width="50%">${data.website}</td>
                        </tr>
                        <tr>
                            <td width="50%">Email</td>
                            <td width="50%">${data.email}</td>
                        </tr>
                        <tr>
                            <td width="50%">Venue</td>
                            <td width="50%">${data.venue}</td>
                        </tr>
                        <tr>
                            <td width="50%">Team Colors</td>
                            <td width="50%">${data.clubColors}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
            <div class="card">
                <div class="card-content">
                    <h5 class="center">List players</h5><br>
                    <hr>
                    <table class="highlight">
                    <thead>
                        <tr>
                            <th width="45%">Name</th>
                            <th width="20%">Position</th>
                            <th width="35%">Nationaly</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${squad}
                    </tbody>
                    </table>
                </div>
            </div>
    `; 
    teamElement.innerHTML = team;
    
}

//Data standings
const getAllStandings = () => {
    if ("caches" in window) {
        caches.match(ENDPOINT_STANDINGS).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    //console.log("Data: " + data);
                    showStandings(data);
                })
            }
        })
    }
    fetchAPI(ENDPOINT_STANDINGS)
        .then(data => {
            showStandings(data);
        })
        .catch(error => {
            console.log(error)
        })
}

const showStandings = data => {
    let standings = "";
    let standingElement =  document.getElementById("getStandings");

    data.standings[0].table.forEach(function (standing) {
        console.log(standing.team.id);
        standings += `
                <tr>
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="20px" height="20px" alt="badge"/></td>
                    <td><a href="/article.html?id=${standing.team.id}">${standing.team.name}</a></td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                </tr>
        `;
    });
    
    standingElement.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th>Icon</th>
                            <th>Team Name</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standings}
                    </tbody>
                </table>
           </div>
    `;
}

//disini 
const getSavedTeams = () => {
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION).then(function (response) {
            console.log(ENDPOINT_COMPETITION);
            if (response) {
                response.json().then(function(team) {
                    getAll().then(function (team) {
                        var articlesHTML = "";
                        team.forEach(function(article) {
                            console.log("show "+article.id);
                            articlesHTML += `
                            <div class="col l3 s6 m4">
                                <div class="card">
                                <a href="./article.html?id=${article.id}&saved=true">
                                    <div class="card-image">
                                    <img src="${article.crestUrl}" width="200" height="200"  style="padding: 15px 10px 30px 10px;" >
                                    <a  href="./article.html?id=${article.id}&saved=true" class="btn-floating halfway-fab waves-effect blue darken-3"><i class="material-icons">chevron_right</i></a>
                                    </div>
                                    <div class="card-content" style="margin-top: -25px;">
                                    <p>${article.shortName}</p>
                                    </div>
                                </a>
                                </div>
                            </div>
                            `;
                        });
                        // Sisipkan komponen card ke dalam elemen dengan id #body-content
                        document.getElementById("articles").innerHTML = articlesHTML;
                    });
                })
            }
        })
    }
    fetchAPI(ENDPOINT_COMPETITION)
        .then(function(){
            getAll().then(function (team) {
                let articlesHTML = "";
                team.forEach(function(article) {                   
                    //console.log("show "+article.shortName);
                    articlesHTML += `
                    <div class="col l3 s6 m4">
                        <div class="card">
                        <a href="./article.html?id=${article.id}&saved=true">
                            <div class="card-image">
                            <img src="${article.crestUrl}" width="200" height="200"  style="padding: 15px 10px 30px 10px;" >
                            <a  href="./article.html?id=${article.id}&saved=true" class="btn-floating halfway-fab waves-effect blue darken-3"><i class="material-icons">chevron_right</i></a>
                            </div>
                            <div class="card-content" style="margin-top: -25px;">
                            <p>${article.shortName}</p>
                            </div>
                        </a>
                        </div>
                    </div>
                    `;
                });
                document.getElementById("articles").innerHTML = articlesHTML;
            });
        })
        .catch(error => {
            console.log(error);
        });  
}


//inibaru
const savedTeams = () => {

}

const getSavedTeamById = () => {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    
    //console.log("id parameter " +idParam);
    getById(idParam).then(data => {
        //console.log(data);
        let squad = "";
        let team = "";
        data.squad.forEach(function(article){
            //console.log(article.name);
            squad += `
            <tr>
                <td width="45%">${article.name}</td>
                <td width="20%">${article.position}</td>
                <td width="35%">${article.nationality}</td>
            </tr>
            `;
        });
        
        team += `
            <div class="card">
                <div class="card-image">
                    <img class="center" src="${data.crestUrl}" width="200" height="350"  style="padding: 15px 10px 30px 10px;" >
                </div>
                <div class="card-content" style="margin-top: -25px;">
                    <table class="striped">
                    <tbody>
                        <tr>
                            <td width="50%">Name</td>
                            <td width="50%">${data.name}</td>
                        </tr>
                        <tr>
                            <td width="50%">Short Name</td>
                            <td width="50%">${data.shortName}</td>
                        </tr>
                        <tr>
                            <td width="50%">Addres</td>
                            <td width="50%">${data.address}</td>
                        </tr>
                        <tr>
                            <td width="50%">Phone</td>
                            <td width="50%">${data.phone}</td>
                        </tr>
                        <tr>
                            <td width="50%">Website</td>
                            <td width="50%">${data.website}</td>
                        </tr>
                        <tr>
                            <td width="50%">Email</td>
                            <td width="50%">${data.email}</td>
                        </tr>
                        <tr>
                            <td width="50%">Venue</td>
                            <td width="50%">${data.venue}</td>
                        </tr>
                        <tr>
                            <td width="50%">Team Colors</td>
                            <td width="50%">${data.clubColors}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
            <div class="card">
                <div class="card-content">
                    <h5 class="center">List players</h5><br>
                    <hr>
                    <table class="highlight">
                    <thead>
                        <tr>
                            <th width="45%">Name</th>
                            <th width="20%">Position</th>
                            <th width="35%">Nationaly</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${squad}
                    </tbody>
                    </table>
                </div>
            </div>
        `; 
      document.getElementById("body-content").innerHTML = team;
    });
}