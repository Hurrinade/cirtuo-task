import { useFilterBooks } from "@/composables/books"
import { expect, test, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from "pinia";
import { useUserStore } from '@/stores/user';
import { useBookStore } from '@/stores/book';

beforeEach(() => {
    setActivePinia(createPinia()); // Creates and activates a Pinia instance for testing
});

test('Test book filtering for search string', async () => {
    const user = useUserStore();
    const bookStore = useBookStore();
    const { login } = user;
    const { getBooks } = bookStore;

    // Login user
    const loingResponse = await login({
        email: "admin@test.com",
        password: "password"
    })

    if (loingResponse.error) {
        throw new Error("Login failed");
    }

    // Get all books
    await getBooks();

    // Filter books and test solution
    const filteredBooks = useFilterBooks('to');
    expect(filteredBooks.length).toBe(2);

    expect(filteredBooks).toEqual([
        {
            "title": "To Kill a Mockingbird",
            "author": "Harper Lee",
            "description": "A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.",
            "cover_image": "tokillamockingbird.jpg",
            "userId": 1,
            "id": 1
        },
        {
            "title": "War and Peace",
            "author": "Leo Tolstoy",
            "description": "A historical novel that chronicles the French invasion of Russia and the impact of the Napoleonic era on Tsarist society.",
            "cover_image": "warandpeace.jpg",
            "userId": 1,
            "id": 6
        }
    ]);
})