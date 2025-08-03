const mongoose = require("mongoose");

/**
 * @description Represents a set of predefined emotional states or moods.
 * This object is frozen to prevent any modifications, making it behave like an enum.
 */
const Mood = {
    HAPPY: 'HAPPY',
    SAD: 'SAD',
    NEUTRAL: 'NEUTRAL',
    SURPRISED: 'SURPRISED'
};
// Freeze the object to make it immutable.
Object.freeze(Mood);

const songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    audio: {
        type: String,
        required: true // Assuming this is a URL or file path
    },
    // The 'mood' field is now restricted to the values in the Mood object.
    mood: {
        type: String,
        enum: Object.values(Mood), // Use the values from the Mood object
        required: true
    }
});

const SongModel = mongoose.model('songs', songSchema);

module.exports = SongModel;
