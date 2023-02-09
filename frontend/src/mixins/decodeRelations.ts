import fetchHelper from 'src/mixins/fetchHelper';

// Pocketbase relations are encoded in the form of a string of characters.
// Use this helper to decode the relations by fetching the related entities.

// Example usage:
// const decodedMaterial = await decodeRelation('material', materialName);
//
// 'MUj4R4OqRwctVGZ' -> 'Wire'

async function decodeRelation(collection: string, id: string) {
    const decoded = await fetchHelper({
        method: 'GET',
        url: `/api/collections/${collection}/records/${id}`,
    }).then((res) => res.json());

    return decoded;
}

export default decodeRelation;
