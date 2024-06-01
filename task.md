Steps:

1. Using fetch, retrieve a random piece of text from a
public API or a custom collection of various English words or
text pieces in JSON format.

2. Display the text for the user to type.

3. When a user starts typing, start a timer and run it for 60 seconds.

4. Highlight each correctly typed character in a shade of green and every
incorrectly typed character in a shade of red.

5. Either highlight the current word or display it in a separate area.

6. Allow the use of backspace to undo typed characters

7. When the timer ends, calculate and display the user's typing speed (WPM) and word accuracy (%). You can also calculate these metrics in real-time. Do not count words that were not typed correctly.

8. Allow the user to reset and start again with a new piece of text.

9. Allow using the "enter" key for restarting and the "esc" key for resetting the test.

10. Store the user's metrics (speed and accuracy).

11. Display the user's metrics over time in a visually appealing way (a table or a chart).

12. After each attempt, indicate whether the user has improved over their previous attempts.

13. Use module imports (and exports) to organize your code.

Additional comments
Interact with DOM elements for displaying text, user input, and results. You can interact with existing elements in static HTML and/or create new HTML elements using JavaScript.
Use event listeners for user interactions (e.g., detecting input, and resetting the test).
Store and retrieve user progress data using local storage.
Display errors for failed API requests and other potential issues.
Structure your code in a manner that would allow you to easily change key features without the need to know the entire codebase.
You can use external CSS and JS libraries as long as they are not directly related to the typing test logic.
Your code should be understandable by your peers. Where needed, add comments to explain non-trivial parts of your code.