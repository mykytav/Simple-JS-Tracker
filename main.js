/* eslint-disable*/

function saveIssue(e) {
	//Get our inputs
	const issueDesc = document.getElementById('issueDescInput').value;
	const issueSeverity = document.getElementById('issueSeverityInput').value;
	const issueAssignedTo = document.getElementById('issueAssignedToInput').value;
	//Now we use chase JS assigning global identifier to our variable
	const issueId = chance.guid();
	const issueStatus = 'Open';

	//Create an object where we put our inputs + unique id + status
	const issue = {
		id: issueId,
		description: issueDesc,
		severity: issueSeverity,
		assignedTo: issueAssignedTo,
		status: issueStatus,
	}

	//Check if the local storage is empty and add our objects to array issues
	if (localStorage.getItem('issues') == null) {
		const issues = [];
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	} else {
		const issues = JSON.parse(localStorage.getItem('issues'));
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	}

	//Clear our inputs
	document.getElementById('issueInputForm').reset()

	//Call fethc data to refresh our visualising
	fetchData();

	e.preventDefault();
}

function setStatusClosed(id) {
	const issues = JSON.parse(localStorage.getItem('issues'));

	for (let i = 0; i < issues.length; i++) {
		if(issues[i].id === id){
			issues[i].status = 'Closed';
		}
	}

	localStorage.setItem('issues', JSON.stringify(issues));

	fetchData();
}

function deleteIssue(id) {
	const issues = JSON.parse(localStorage.getItem('issues'));

	for (let i = 0; i < issues.length; i++) {
		if(issues[i].id === id){
			issues.splice(i, 1);
		}
	}

	localStorage.setItem('issues', JSON.stringify(issues));

	fetchData();
	e.preventDefault();
}
 
function fetchData() {
  const issues = JSON.parse(localStorage.getItem('issues')) || [];
  const issuesList = document.getElementById('issuesList');

	issuesList.innerHTML = '';

  	for(let i = 0; i < issues.length; i++) {
  	const id = issues[i].id;
  	const desc = issues[i].description;
  	const severity = issues[i].severity;
  	const assignedTo = issues[i].assignedTo;
  	const status = issues[i].status;

  	issuesList.innerHTML += `
		<div class="well">
			<h6>Issue ID: ${id}</h6>
			<p><span class="badge badge-info">${status}</span></p>
			<h3>${desc}</h3>
			<p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
			<p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
			<a href="#" onclick="event.preventDefault(); setStatusClosed('${id}')" class="btn btn-warning">Close</a>
			<a href="#" onclick="event.preventDefault(); deleteIssue('${id}')" class="btn btn-danger">Delete</a>
		</div>`
  }  
}

document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

/* eslint-disable*/
