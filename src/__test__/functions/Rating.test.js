import { generateStars } from '../../functions/Rating.js';

describe('generateStars function', () => {
    test('returns correct stars for rating 0', () => {
        const stars = generateStars(0);
        expect(stars).toBe('☆☆☆☆☆');
    });

    test('returns correct stars for rating 2', () => {
        const stars = generateStars(2);
        expect(stars).toBe('⭐️⭐️☆☆☆');
    });

    test('returns correct stars for rating 4.5', () => {
        const stars = generateStars(4.5);
        expect(stars).toBe('⭐️⭐️⭐️⭐️🌟');
    });

    test('returns correct stars for rating 5', () => {
        const stars = generateStars(5);
        expect(stars).toBe('⭐️⭐️⭐️⭐️⭐️');
    });
});
