from src.agents.personalized_agent import PersonalizedAIAgent
import streamlit as st
import sys
from pathlib import Path
import json
from datetime import datetime

# Add the project root directory to Python path
project_root = Path(__file__).parent
sys.path.append(str(project_root))


def initialize_session_state():
    """Initialize session state variables"""
    if 'agent' not in st.session_state:
        st.session_state.agent = PersonalizedAIAgent()
    if 'current_user' not in st.session_state:
        st.session_state.current_user = None
    if 'chat_history' not in st.session_state:
        st.session_state.chat_history = []


def login_user(user_id: str):
    """Login user and initialize or load their profile"""
    if not st.session_state.agent.load_profile(user_id):
        st.session_state.agent.initialize_user(user_id)
        st.success(f"Created new profile for user: {user_id}")
    else:
        st.success(f"Welcome back, {user_id}!")
    st.session_state.current_user = user_id


def main():
    st.set_page_config(page_title="AI Tutor", layout="wide")
    initialize_session_state()

    # Sidebar
    with st.sidebar:
        st.title("AI Tutor")

        # Login section
        if st.session_state.current_user is None:
            user_id = st.text_input("Enter User ID")
            if st.button("Login"):
                if user_id:
                    login_user(user_id)
                else:
                    st.error("Please enter a User ID")
        else:
            st.write(f"Logged in as: {st.session_state.current_user}")
            if st.button("Logout"):
                st.session_state.agent.save_profile(
                    st.session_state.current_user)
                st.session_state.current_user = None
                st.session_state.chat_history = []
                st.rerun()

        # Show preferences when logged in
        if st.session_state.current_user:
            st.subheader("Learning Preferences")
            profile = st.session_state.agent.learning_profiles.get(
                st.session_state.current_user)

            # Add new preference
            new_key = st.text_input("Preference Key")
            new_value = st.text_input("Preference Value")
            if st.button("Add Preference"):
                if new_key and new_value:
                    profile.preferences[new_key] = new_value
                    st.success(f"Added preference: {new_key} = {new_value}")

    # Main content area
    if st.session_state.current_user:
        # Chat interface
        # st.title("Chat with AI Tutor")

        # Display chat history
        for message in st.session_state.chat_history:
            with st.chat_message(message["role"]):
                st.write(message["content"])

        # Chat input
        if prompt := st.chat_input("Ask me anything..."):
            # Display user message
            with st.chat_message("user"):
                st.write(prompt)
            st.session_state.chat_history.append(
                {"role": "user", "content": prompt})

            # Generate and display AI response
            with st.chat_message("assistant"):
                response = st.session_state.agent.generate_response(
                    st.session_state.current_user,
                    prompt
                )
                st.write(response)
            st.session_state.chat_history.append(
                {"role": "assistant", "content": response})

        # Knowledge state
        with st.expander("Knowledge State"):
            profile = st.session_state.agent.learning_profiles.get(
                st.session_state.current_user)
            if profile.knowledge_state:
                for topic, level in profile.knowledge_state.items():
                    st.progress(level, text=f"{topic}: {level:.2f}")
            else:
                st.info("No topics learned yet")

        # Recent interactions
        with st.expander("Recent Interactions"):
            profile = st.session_state.agent.learning_profiles.get(
                st.session_state.current_user)
            if profile.interaction_history:
                for interaction in profile.interaction_history[-5:]:
                    with st.container():
                        st.text(f"Time: {interaction['timestamp']}")
                        st.text("User: " + interaction['user_input'])
                        st.text("AI: " + interaction['agent_response'])
                        st.divider()
            else:
                st.info("No interaction history yet")

    else:
        # Login prompt
        st.title("Welcome to Learnaware AI")
        st.write("Please login using the sidebar to start learning!")


if __name__ == "__main__":
    main()
