import instaloader
import logging
# from instaloader import Instaloader, Profile, exceptions

# Enable debug-level logging
logging.basicConfig(level=logging.DEBUG)

# Create an instance of Instaloader
L = instaloader.Instaloader()

try:
    # Log in to Instagram
    L.login('younglionrasmus', 'Fgzpz3XGQ8ZKvh2')  # Login with your username and password
    print("Successfully logged in!")

    # Save the session for future use
    L.save_session_to_file()
    print("Session saved successfully!")

except instaloader.exceptions.BadCredentialsException:
    print("Invalid username or password. Please try again.")
except instaloader.exceptions.ConnectionException as e:
    print(f"Connection error: {e}")
except Exception as e:
    print(f"An error occurred: {e}")

# Replace 'SHORTCODE' with the actual shortcode of the post you want to retrieve the caption from
# post = instaloader.Post.from_shortcode(L.context, 'DDolDlroNTZ')

# Print the caption of the post
# print(post.caption)

# Specify the username of the profile you want to fetch posts from
username = 'sens_khreshchatyk'

# Fetch the profile
profile = instaloader.Profile.from_username(L.context, username)

i=0
# Iterate through the user's posts
for post in profile.get_posts():
    print(f"Post ID: {post.mediaid}")
    print(f"Post Date: {post.date}")
    print(f"Caption: {post.caption}")
    i=i+1
    if i>10:
        exit
    print("------")