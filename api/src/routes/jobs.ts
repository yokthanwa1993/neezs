import { Router, Request, Response } from 'express';
import { db } from '../firebase';

const router = Router();

// GET /api/jobs
router.get('/', async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit || 100);
    const snapshot = await db
      .collection('jobs')
      .where('status', '==', 'active')
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();

    const items = snapshot.docs.map((doc: FirebaseFirestore.QueryDocumentSnapshot) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ items });
  } catch (error: any) {
    console.error('GET /api/jobs error:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET /api/jobs/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const doc = await db.collection('jobs').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Job not found' });
    }
    return res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error: any) {
    console.error('GET /api/jobs/:id error:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST /api/jobs
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, category, location, salary, jobType, status, employerId, images } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Missing required fields: title, description' });
    }

    const payload = {
      title,
      description,
      category: category || '',
      location: location || '',
      salary: Number(salary || 0),
      jobType: jobType || 'full-time',
      status: status || 'active',
      employerId: employerId || 'unknown',
      images: Array.isArray(images) ? images.filter(Boolean) : [],
      createdAt: new Date(),
    };

    const ref = await db.collection('jobs').add(payload);
    const snap = await ref.get();
    res.status(201).json({ id: ref.id, ...snap.data() });
  } catch (error: any) {
    console.error('POST /api/jobs error:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;


