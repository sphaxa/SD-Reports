#include <sourcemod>
#include <sdktools>
#include <system2>
#include <commandfilters>

#pragma semicolon 1
#pragma newdecls required

#define PLUGIN_VERSION "0.11"

public Plugin myinfo = 
{
	name = "sd_reports",
	author = "sphhax",
	description = "Game module for SD Reports",
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
	LoadTranslations("common.phrases");
	CreateConVar("sm_sdrgame_version", PLUGIN_VERSION, "Standard plugin version ConVar. Please don't change me!", FCVAR_REPLICATED|FCVAR_NOTIFY|FCVAR_DONTRECORD);
	RegConsoleCmd("sdrgame_ping", Sdrgame_Ping);
	RegConsoleCmd("report", Sdrgame_Report);
	CreateTimer(300.0, Timer_PrintAdvertisements, _, TIMER_REPEAT);
}


public Action Timer_PrintAdvertisements(Handle timer)
{
	PrintToChatAll("\x0FREPORTS\x02 | \x01Type !report <player> '<reason>' to report a player");
	PrintToChatAll("\x0FREPORTS\x02 | \x01Reports go directly to server admins in Discord");
	
	return Plugin_Continue;
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
	char reported_player_resolved[64];
	char reporter_player_resolved[64];
	int target_index;
	if (args < 2) {
		ReplyToCommand(client, "\x0FREPORTS\x02 | \x01Report Bot Usage: !report <playername> <reason>");
		return Plugin_Handled;
	}
	if (args > 2) {
		ReplyToCommand(client, "\x0FREPORTS\x02 | \x01Report Bot Usage: !report <playername> '<reason>'");
		ReplyToCommand(client, "\x0FREPORTS\x02 | \x01Make sure you put quotes '' around your reason");
		return Plugin_Handled;
	}
	char reported_player[128];
	char report_reason[128];
	
	GetCmdArg(1, reported_player, sizeof(reported_player));
	GetCmdArg(2, report_reason, sizeof(report_reason));
	
	target_index = getTargetedPlayer(client, reported_player);
	if (target_index == -1) {
		return Plugin_Handled;
	}
	
	GetClientName(target_index, reported_player_resolved, sizeof(reported_player_resolved));
	GetClientName(client, reporter_player_resolved, sizeof(reporter_player_resolved));
	
	reportRequestMethod(reporter_player_resolved, reported_player_resolved, report_reason);
	ReplyToCommand(client, "\x0FREPORTS\x02 | \x01Report Sent.");
	return Plugin_Handled;
}

public void reportRequestMethod(char reporter_player[64], char reported_player[64], char report_reason[128]) {
	System2HTTPRequest reportRequest = new System2HTTPRequest(HttpResponseCallback, "http://184.187.247.109:3000/report");
	reportRequest.SetData("SERVER_ID=1&REPORTER_NAME=%s&REPORTER_STEAMID=&REPORTEE_NAME=%s&REPORTEE_STEAMID=&REPORT_REASON=%s&SECURITY_KEY=ayo", reporter_player, reported_player, report_reason);
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
		PrintToChatAll("\x0FREPORTS\x02 | \x01Report Bot: Network failure, contact staff.");
	}
}

public int getTargetedPlayer(int client, char reported_player[128]) {
	int target_index = FindTarget(client, reported_player, true, false);
	return target_index;
}
