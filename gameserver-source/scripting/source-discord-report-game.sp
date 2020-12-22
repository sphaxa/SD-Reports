#include <sourcemod>
#include <sdktools>
#include <system2>

#pragma semicolon 1
#pragma newdecls required

#define PLUGIN_VERSION "1.00"

public Plugin myinfo = 
{
	name = "sdrgame",
	author = "sphhax",
	description = "Game module for the source-discord-report-bot",
	version = PLUGIN_VERSION,
	url = ""
};

public void OnPluginStart()
{
	/**
	 * @note For the love of god, please stop using FCVAR_PLUGIN.
	 * Console.inc even explains this above the entry for the FCVAR_PLUGIN define.
	 * "No logic using this flag ever existed in a released game. It only ever appeared in the first hl2sdk."
	 */
	CreateConVar("sm_sdrgame_version", PLUGIN_VERSION, "Standard plugin version ConVar. Please don't change me!", FCVAR_REPLICATED|FCVAR_NOTIFY|FCVAR_DONTRECORD);
	RegConsoleCmd("sdrgame_ping", Sdrgame_Ping);
	RegConsoleCmd("sdrgame_report", Sdrgame_Report);
}

public Action Sdrgame_Ping(int client, int args)
{
	pingRequestMethod();
	ReplyToCommand(client, "Ping sent, check sdrweb console or sdrgame console.");
	return Plugin_Handled;
}

public void pingRequestMethod() {
	System2HTTPRequest pingRequest = new System2HTTPRequest(HttpResponseCallback, "google.com");
	pingRequest.GET();
	delete pingRequest; 
}

public Action Sdrgame_Report(int client, int args)
{
	reportRequestMethod();
	ReplyToCommand(client, "Report Sent.");
	return Plugin_Handled;
}

public void reportRequestMethod() {
	System2HTTPRequest reportRequest = new System2HTTPRequest(HttpResponseCallback, "localhost:3000/report");
	reportRequest.SetData("SERVER_ID=3&SERVER_NAME=DEAGLE&SECURITY_KEY=ayo&REPORTEE_NAME=derp&REPORTER_NAME=sphhax&REPORT_REASON=Yo");
	reportRequest.POST();
	delete reportRequest; 
}

void HttpResponseCallback(bool success, const char[] error, System2HTTPRequest request, System2HTTPResponse response, HTTPRequestMethod method)
{
	if (success) {
		char[] content = new char[response.ContentLength + 1];
		response.GetContent(content, response.ContentLength + 1);
		int statusCode = response.StatusCode;
		if (statusCode != 200) {
			PrintToServer("sdrgame: Network request returned an error. %s", content);
		} else {
		PrintToServer("sdrgame: A network request was completed.");
		}
	} else {
		PrintToChatAll("Report Bot: Network failure, contact staff.");
	}
}
