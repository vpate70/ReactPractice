export const generateStars = (rating) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating - filledStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - filledStars - halfStar;

    const stars = [];
    for (let i = 0; i < filledStars; i++) {
        stars.push("⭐️");
    }
    if (halfStar) {
        stars.push("🌟");
    }
    for (let i = 0; i < emptyStars; i++) {
        stars.push("☆");
    }

    return stars.join("");
}