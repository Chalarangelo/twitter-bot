const MAX_CAPTION_LENGTH = 240; // maximum number of characters allowed per tweet
const HASHTAGS = `#30secondsofcode #JavaScript #LearnToCode #100DaysOfCode #js`;

const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + "..." : str;

const caption = ({ description, link }) => {
  const maxDescriptionLength =
    MAX_CAPTION_LENGTH - HASHTAGS.length - link.length - 2; // where 2 is spacing between all caption elements

  // truncate description if needed
  const truncatedDescription = truncateString(
    description,
    maxDescriptionLength
  );

  const tweetCaption = `${truncatedDescription} ${HASHTAGS} ${link}`;

  return tweetCaption;
};

module.exports = caption;
