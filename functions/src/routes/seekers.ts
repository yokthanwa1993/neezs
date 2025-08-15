import { Router, Request, Response } from 'express';
import { db, auth } from '../firebase';

const router = Router();

// Map Firestore user document to employer view profile
function mapUserDocToProfile(doc: FirebaseFirestore.DocumentSnapshot): any {
  const data = doc.data() || {};
  return {
    id: doc.id,
    name: data.name || data.displayName || 'ผู้ใช้',
    title: data.title || data.roleTitle || 'ผู้สมัครงาน',
    location: data.location || data.city || '—',
    rating: Number(data.rating || 4.7),
    reviews: Number(data.reviews || 50),
    bio: data.bio || '',
    skills: Array.isArray(data.skills) ? data.skills : [],
    photos: Array.isArray(data.photos) ? data.photos : [],
    profileImageUrl: data.picture || data.photoURL || '',
  };
}

// GET /api/seekers?limit=50
router.get('/', async (req: Request, res: Response) => {
  try {
    const limit = Math.min( Number(req.query.limit || 50), 100 );

    // Prefer Firestore collection `users` with role == 'seeker'
    const usersSnap = await db
      .collection('users')
      .where('role', '==', 'seeker')
      .limit(limit)
      .get();

    let items: any[] = [];
    if (!usersSnap.empty) {
      items = usersSnap.docs.map(mapUserDocToProfile);
    } else {
      // Fallback: list auth users with customClaims.role == 'seeker' (best-effort)
      const list = await auth.listUsers(1000);
      const seekers = list.users.filter(u => (u.customClaims as any)?.role === 'seeker');
      items = seekers.slice(0, limit).map((u) => ({
        id: u.uid,
        name: u.displayName || 'ผู้ใช้',
        title: 'ผู้สมัครงาน',
        location: '—',
        rating: 4.7,
        reviews: 50,
        bio: '',
        skills: [],
        photos: [],
        profileImageUrl: u.photoURL || '',
      }));
    }

    res.set('Cache-Control', 'no-store');
    return res.status(200).json({ items });
  } catch (error: any) {
    console.error('GET /api/seekers error:', error);
    return res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
});

export default router;


