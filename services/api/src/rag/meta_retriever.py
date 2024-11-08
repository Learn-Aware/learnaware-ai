from typing import List, Dict, Optional
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import json
import os
from pathlib import Path

class MetaRetriever:
    def __init__(self, model_name: str = 'all-MiniLM-L6-v2'):
        self.encoder = SentenceTransformer(model_name)
        self.knowledge_base = {}
        self.embeddings = {}
        self.load_knowledge_base()

    def load_knowledge_base(self):
        """Load and initialize the knowledge base"""
        kb_path = Path(__file__).parent / 'data' / 'knowledge_base.json'
        if kb_path.exists():
            with open(kb_path, 'r') as f:
                self.knowledge_base = json.load(f)
                # Pre-compute embeddings for all documents
                for doc_id, doc in self.knowledge_base.items():
                    self.embeddings[doc_id] = self.encoder.encode(doc['content'])

    def retrieve(self, query: str, k: int = 3) -> List[Dict]:
        """Retrieve relevant documents using meta-learning approach"""
        query_embedding = self.encoder.encode(query)
        
        # Calculate similarities with all documents
        similarities = {}
        for doc_id, doc_embedding in self.embeddings.items():
            sim = cosine_similarity([query_embedding], [doc_embedding])[0][0]
            similarities[doc_id] = sim

        # Get top-k documents
        top_k_ids = sorted(similarities.keys(), key=lambda x: similarities[x], reverse=True)[:k]
        return [self.knowledge_base[doc_id] for doc_id in top_k_ids]

    def update_knowledge_base(self, document: Dict):
        """Add new document to knowledge base with meta-information"""
        doc_id = str(len(self.knowledge_base))
        self.knowledge_base[doc_id] = document
        self.embeddings[doc_id] = self.encoder.encode(document['content']) 