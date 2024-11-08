from src.agents.personalized_agent import PersonalizedAIAgent
import sys
from pathlib import Path
import cmd
import json
import os

# Add the project root directory to Python path
project_root = Path(__file__).parent
sys.path.append(str(project_root))


class AITutor(cmd.Cmd):
    intro = """
    Welcome to the AI Tutor! 
    Type 'help' to list commands.
    Type 'quit' to exit.
    """
    prompt = '(AI Tutor) > '

    def __init__(self):
        super().__init__()
        self.agent = PersonalizedAIAgent()
        self.current_user = None

    def do_login(self, user_id):
        """Login with a user ID: login <user_id>"""
        if not user_id:
            print("Please provide a user ID")
            return

        self.current_user = user_id
        # Try to load existing profile, create new if not found
        if not self.agent.load_profile(user_id):
            self.agent.initialize_user(user_id)
            print(f"Created new profile for user: {user_id}")
        else:
            print(f"Welcome back, {user_id}!")

    def do_ask(self, question):
        """Ask the AI a question: ask <your question>"""
        if not self.current_user:
            print("Please login first using 'login <user_id>'")
            return

        if not question:
            print("Please provide a question")
            return

        try:
            response = self.agent.generate_response(
                self.current_user, question)
            print("\nAI Response:")
            print(response)
            print()
        except Exception as e:
            print(f"Error generating response: {str(e)}")

    def do_topics(self, arg):
        """Show current knowledge state for all topics"""
        if not self.current_user:
            print("Please login first using 'login <user_id>'")
            return

        profile = self.agent.learning_profiles.get(self.current_user)
        if profile and profile.knowledge_state:
            print("\nKnowledge State:")
            for topic, level in profile.knowledge_state.items():
                print(f"{topic}: {level:.2f}")
        else:
            print("No topics learned yet")
        print()

    def do_history(self, arg):
        """Show recent interaction history"""
        if not self.current_user:
            print("Please login first using 'login <user_id>'")
            return

        profile = self.agent.learning_profiles.get(self.current_user)
        if profile and profile.interaction_history:
            print("\nRecent Interactions:")
            for interaction in profile.interaction_history[-5:]:
                print(f"\nUser: {interaction['user_input']}")
                print(f"AI: {interaction['agent_response']}")
                print(f"Time: {interaction['timestamp']}")
        else:
            print("No interaction history yet")
        print()

    def do_set_preference(self, arg):
        """Set a learning preference: set_preference <key> <value>"""
        if not self.current_user:
            print("Please login first using 'login <user_id>'")
            return

        try:
            key, value = arg.split(' ', 1)
            profile = self.agent.learning_profiles.get(self.current_user)
            profile.preferences[key] = value
            print(f"Set preference {key} = {value}")
        except ValueError:
            print("Usage: set_preference <key> <value>")

    def do_preferences(self, arg):
        """Show current learning preferences"""
        if not self.current_user:
            print("Please login first using 'login <user_id>'")
            return

        profile = self.agent.learning_profiles.get(self.current_user)
        if profile and profile.preferences:
            print("\nLearning Preferences:")
            for key, value in profile.preferences.items():
                print(f"{key}: {value}")
        else:
            print("No preferences set")
        print()

    def do_save(self, arg):
        """Save current user profile"""
        if not self.current_user:
            print("Please login first using 'login <user_id>'")
            return

        try:
            self.agent.save_profile(self.current_user)
            print("Profile saved successfully")
        except Exception as e:
            print(f"Error saving profile: {str(e)}")

    def do_quit(self, arg):
        """Exit the AI Tutor"""
        if self.current_user:
            self.agent.save_profile(self.current_user)
            print("Profile saved")
        print("Goodbye!")
        return True

    def default(self, line):
        """Handle unknown commands"""
        print(f"Unknown command: {line}")
        print("Type 'help' for a list of commands")


def main():
    try:
        tutor = AITutor()
        tutor.cmdloop()
    except KeyboardInterrupt:
        print("\nGoodbye!")
        if tutor.current_user:
            tutor.agent.save_profile(tutor.current_user)
            print("Profile saved")
        sys.exit(0)


if __name__ == "__main__":
    main()
