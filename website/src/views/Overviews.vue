<template>
  <v-container fluid>
    <div id="sidebar">
      <nav-floater>
        <v-tabs vertical v-model="tab">
          <v-subheader><strong>Guides</strong></v-subheader>
          <v-tab key="user">Profiles</v-tab>
          <v-tab key="server">Options</v-tab>
          <v-tab key="actions">Actions</v-tab>
          <v-tab key="starboard">Starboard</v-tab>
          <v-subheader><strong>Commands</strong></v-subheader>
          <v-tab key="cmd_users">For Users</v-tab>
          <v-tab key="cmd_mods">For Mods</v-tab>
          <v-tab key="cmd_admin">For Admins</v-tab>
        </v-tabs>
      </nav-floater>
    </div>

    <div id="content">
      <v-tabs-items v-model="tab" class="docs">
        <v-tab-item key="user">
          <div class="panel">
            <v-card>
              <v-card-title>User Profiles</v-card-title>
              <v-card-text>
                <p>The <strong>User Profile</strong> is attached to you, the user. It's independent from any server you may be in, and it keeps track of your <strong>birthday</strong>, local <strong>timezones</strong>, and <strong>starboard</strong> statistics.</p>
                <p>Setting your <strong>birthday</strong> is helpful, as Anni will send out birthday reminders a week before, and announcements day of! Setting your birth year is optional, but doing so will display your age on your profile.</p>
                <p><strong>Timezones</strong> let you set your local time on your profile. That way people can see what time it is for you by viewing your profile, as well as anyone else in the server with <kbd>anni.time</kbd>.</p>
                <p>Since your profile is attached to you and not your server, these options will be available on your profile for every server you are in with Anni. After setting up a profile, it will be hidden in every other Anni server by default, and you can toggle this by using <kbd>anni.profile show</kbd> <span>and/or</span> <kbd>anni.profile hide</kbd></p>
              </v-card-text>
              <v-card-text class="examples">
                <h3>Setting Your Birthday</h3>
                <kbd>anni.birthday 03/21</kbd>
                <kbd>anni.birthday 03/21/2000</kbd>
                <h3>Setting Your Timezone</h3>
                <kbd>anni.timezone chicago</kbd>
                <kbd>anni.timezone new york</kbd>
                <kbd>anni.timezone sydney</kbd>

                <span v-html="$htmlDashLink"></span>
              </v-card-text>
            </v-card>

            <v-card>
              <v-card-title>Birthday Reminders</v-card-title>
              <v-card-text>
                <p>Setting up the reminders and birthdays are easy. By default is turned off, but can be enabled by an admin. All you need to do is set a channel, and Anni will start automatically sending out the reminders and announcements for any user in the server with a birthday on their active profile.</p>
              </v-card-text>
              <v-card-text class="examples">
                <h3>Setting The Channel</h3>
                <kbd>anni.channel #general-chat</kbd>
                <h3>Change The Reminder</h3>
                <kbd>anni.reminder Hey {user}, your birthday is coming up on {date}!</kbd>
                <h3>Change The Announcement</h3>
                <kbd>anni.announce Hey! It's {users} birthday today!</kbd>
                <span>
                  The reminder and announcement message must include either <strong>{user}</strong> (replaced with <strong>@User</strong>) or <strong>{users}</strong> (replaced with <strong>@User's</strong>). It can also include <strong>{date}</strong> for the date of the birthday.
                </span>

                <span v-html="$htmlDashLink"></span>
              </v-card-text>
            </v-card>
          </div>
        </v-tab-item>
        
        <v-tab-item key="server">
          <div class="panel">
            <v-card>
              <v-card-title>Server Profiles</v-card-title>
              <v-card-text>
                <p>The <strong>User Profile</strong> can be expanded with custom options in a per-server basis. Each server can add their own custom profile fields that their members can then fill out using the standard <kbd>anni.profile setup</kbd> command. Unlike the birthday, timezone, and starboard stats, these options are only visible inside the server they are set on.</p>
              </v-card-text>
            </v-card>

            <v-card>
              <v-card-title>Managing Options</v-card-title>
              <v-card-text>
                <p>Admins can add profile options to their custom server profiles. All options are text based, which means you set the label, description, and tag, and then when a user sets up a profile in your server, they populate it with their own text datanni.</p>
                <p>An Option consits of a tag (an identifier, used for setting the option and editing/removing it), a Label (what actually shows up on the profile), and a description. (Useful for when you're looking up your options, and displayed when users set their commands. Separate the label and description from the tag using <kbd>-</kbd>.</p>
              </v-card-text>
              <v-card-text class="examples">
                <h3>Creating A New Option</h3>
                <kbd>anni.option new tag -Tag -Introduction</kbd>
                <h3>Editing An Option</h3>
                <kbd>anni.option set tag -My Tagline -A Brief Intro</kbd>
                <h3>Removing An Option</h3>
                <em>Note: deleting a profile option will remove the option from every profile in the guild.</em>
                <kbd>anni.option rem tag</kbd>

                <span v-html="$htmlDashLink"></span>
              </v-card-text>
            </v-card>

            <v-card>
              <v-card-title>Setting A Custom Option</v-card-title>
              <v-card-text>
                <p>Once a profile option has been created, when you run <kbd>anni.profile setup</kbd> in the server, Anni will DM you instructions for setting up your profile, including a list of all the available profile fields, their descriptions, and the command to set the datanni.</p>
              </v-card-text>
              <v-card-text class="examples">
                <h3>Setting A Profile Option</h3>
                <em>This command assumes the above option has been created.</em>
                <kbd>anni.set tag I'm here to chew bubblegum.</kbd>

                <span v-html="$htmlDashLink"></span>
              </v-card-text>
            </v-card>
          </div>
        </v-tab-item>
        
        <v-tab-item key="actions">
          <div class="panel">
            <v-card>
              <v-card-title>Using Actions</v-card-title>
              <v-card-text>
                <p>Using <strong>actions</strong>, you can create your own custom call and response commands. Some people use these for <strong>rules command</strong> or an <strong>info command</strong>. It also supports a randomized image response, which makes it great for custom <strong>roleplay</strong> commands.</p>
              </v-card-text>
            </v-card>

            <v-card>
              <v-card-title>Basic Actions</v-card-title>
              <v-card-text>
                <p>Creating a basic action - such as for the <strong>rules</strong> or <strong>info</strong> command is relatively easy in command form. Since <strong>anni.action</strong> is a lot to type out, we'll use the shorthand <strong>anni.ac</strong> instead. When you create an action, the tag you use becomes the command. To use the example below, we would call the command with <strong>anni.welcome</strong>.</p>
              </v-card-text>
              <v-card-text class="examples">
                <h3>Creating An Action</h3>
                <kbd>anni.ac new welcome Welcome to our server!</kbd>
                <h3>Editing An Action</h3>
                <kbd>anni.ac edit welcome Welcome! Read the #rules!</kbd>
                <h3>Deleting An Action</h3>
                <kbd>anni.ac delete welcome</kbd>

                <span v-html="$htmlDashLink"></span>
              </v-card-text>
            </v-card>

            <v-card>
              <v-card-title>Advanced Actions</v-card-title>
              <v-card-text>
                <p>If you want to make an action that has a bit more of a <strong>roleplay</strong> aspect to it <em>(such as anni.hug)</em>, then adding image responses is the way to go. You can add more than one, and when someone fires the action it will pick one at random.</p>
              </v-card-text>
              <v-card-text class="examples">
                <h3>Create An Action</h3>
                <kbd>anni.ac new hugs *{user} hugs {msg}*</kbd>
                <em>You can include <strong>{user}</strong> to ping the user who typed the command, and you can include <strong>{msg}</strong> to include the message typed after the command. At this point, if a user uses <strong>anni.hugs</strong>, Anni returns with <strong>@User hugs</strong>, and if the user uses <strong>anni.hugs @user v hard</strong> Anni returns with <strong>@User hugs @user v hard</strong>.</em>

                <h3>Adding / Removing Images</h3>
                <kbd>anni.ac add hugs https://i.imgur.com/r9aU2xv.gif</kbd>
                <em>Animated images must be a <strong>.gif</strong> for now, until I can make it easy to embed <strong>.gifv</strong> or <strong>.mp4</strong></em>
                <kbd>anni.ac remove hugs https://i.imgur.com/r9aU2xv.gif</kbd>

                <span v-html="$htmlDashLink"></span>
              </v-card-text>
            </v-card>
          </div>
        </v-tab-item>
        
        <v-tab-item key="starboard">
          <div class="panel">
            <v-card>
              <v-card-title>The Starboard</v-card-title>
              <v-card-text>
                <p>Like many other bots, Anni can manage a <strong>starboard</strong> for your server. If you've never encountered one before, it's essentially a <strong>Hall of Fame Channel</strong> for messages in your server. When someone says something the server enjoys and they want to "frame" it, they <strong>react to it with a star</strong>. Once a certain number of reactions get reached, the message gets posted in the starboard channel.</p>
                <p>When a user gets a starred post, Anni keeps track on their user profile of how many posts they have starred, and how many stars they've received across all posts. These stats are cumulative, across all servers the user is in with Anni's starboard enabled.</p>
              </v-card-text>
            </v-card>

            <v-card>
              <v-card-title>Managing The Starboard</v-card-title>
              <v-card-text class="examples">
                <p>You will need to create a channel for the starboard, and make sure that <strong>only Anni</strong> has permissions to send messages in the channel!</p>
                <h3>Setting The Channel</h3>
                <kbd>anni.board #starboard</kbd>
                <h3>Changing The Emoji to React With</h3>
                <kbd>anni.emoji :heart:</kbd>
                <h3>Changing The Reactions Needed</h3>
                <kbd>anni.amount 4</kbd>
              </v-card-text>
            </v-card>
          </div>
        </v-tab-item>
        
        <v-tab-item key="cmd_users">
          <div class="panel">
            <config-list title="User Commands" v-model="cmd1">
              <config-item v-for="doc in $cmdDocs.user" :key="doc.name">
                <template v-slot:name>{{ doc.head }}</template>
                <template v-slot:text>
                  <div v-html="doc.desc"></div>
                  
                  <h3 v-if="doc.subs" class="sub">Sub Commands</h3>
                  <div v-if="doc.subs" class="subs">
                    <v-card flat v-for="sub in doc.subs" :key="sub.name">
                      <v-card-title>{{ sub.head }}</v-card-title>
                      <v-card-text v-html="sub.desc"></v-card-text>
                    </v-card>
                  </div>
                </template>
              </config-item>
            </config-list>
          </div>
        </v-tab-item>
        
        <v-tab-item key="cmd_mods">
          <div class="panel">
            <config-list title="Mod Commands" v-model="cmd2">
              <config-item v-for="doc in $cmdDocs.mods" :key="doc.name">
                <template v-slot:name>{{ doc.head }}</template>
                <template v-slot:text>
                  <div v-html="doc.desc"></div>
                  
                  <h3 v-if="doc.subs" class="sub">Sub Commands</h3>
                  <div v-if="doc.subs" class="subs">
                    <v-card flat v-for="sub in doc.subs" :key="sub.name">
                      <v-card-title>{{ sub.head }}</v-card-title>
                      <v-card-text v-html="sub.desc"></v-card-text>
                    </v-card>
                  </div>
                </template>
              </config-item>
            </config-list>
          </div>
        </v-tab-item>
        
        <v-tab-item key="cmd_admin">
          <div class="panel">
            <config-list title="Admin Commands" v-model="cmd3">
              <config-item v-for="doc in $cmdDocs.admin" :key="doc.name">
                <template v-slot:name>{{ doc.head }}</template>
                <template v-slot:text>
                  <div v-html="doc.desc"></div>
                  
                  <h3 v-if="doc.subs" class="sub">Sub Commands</h3>
                  <div v-if="doc.subs" class="subs">
                    <v-card flat v-for="sub in doc.subs" :key="sub.name">
                      <v-card-title>{{ sub.head }}</v-card-title>
                      <v-card-text v-html="sub.desc"></v-card-text>
                    </v-card>
                  </div>
                </template>
              </config-item>
            </config-list>
          </div>
        </v-tab-item>
      </v-tabs-items>

      <div class="panel">
        <v-divider class="mb-5" />

        <v-card class="mt-5">
          <v-card-text class="text-center">
            <v-btn small text @click="tab = 0">Profiles</v-btn>
            <v-btn small text @click="tab = 1">Server Profiles</v-btn>
            <v-btn small text @click="tab = 2">Actions</v-btn>
            <v-btn small text @click="tab = 3">Starboard</v-btn>
            <br>
            <v-btn small text @click="tab = 4">User Commands</v-btn>
            <v-btn small text @click="tab = 5">Mod Commands</v-btn>
            <v-btn small text @click="tab = 6">Admin Commands</v-btn>
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-text class="text-center">
            <em>
              Bug? Suggestion?
              Ping <strong>@tech</strong> in the 
              <a :href="$urlServer" class="linked" target="_blank">
                <strong>Support Server.</strong>
              </a>
            </em>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
  export default { 
    data() { return { tab: 0, cmd1: -1, cmd2: -1, cmd3: -1 } } 
  }
</script>

<style scoped>
  .v-card { margin: 6px 5px 19px; }
  h3 { margin: 20px 0 5px 0 !important; }
  .sub { padding: 0; margin: 30px 0 15px !important; }
  .docs pre + br { display: none; }
  .subs .v-card { border-left: 3px solid #6666f7; }
  .subs .v-card__title { padding: 5px 16px 0; }
  .subs .v-card__text { padding-bottom: 10px; }
  .config-list >>> h3 { margin-top: 0; }

  .docs .examples p { margin-bottom: 10px; }
  .docs .examples h3 { margin-bottom: 5px; }
  .docs .examples h3:not(:first-of-type) { margin-top: 15px; }
  .docs .examples span { display: block; margin: 20px 0 0; }
  .docs .examples em { display: block; }
  .docs .examples h3 + em { margin: -8px 0 5px; }
  .docs .examples kbd + em { margin: 5px 0 10px; }
  .docs .examples { padding-top: 0; }
  .docs .v-card__text:not(.examples):not(:last-of-type) { padding-bottom: 0; }
</style>