/**
 * Utility to process and compress uploaded image files to local Base64 data URLs
 * Suitable for instant mobile upload and localStorage persistence.
 */
export const processImageFile = (file: File, maxDimension = 800, quality = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please select a valid image file.'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new window.Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(readerEvent.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image.'));
      img.src = readerEvent.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsDataURL(file);
  });
};

export const PRESET_FOOD_PHOTOS = [
  {
    name: 'Dum Biryani',
    url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'Biryani Handi Pot',
    url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'Crispy Chicken Fry',
    url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'Spicy Masala Fry',
    url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'Chicken Rice Meal',
    url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'Charcoal Kebab',
    url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'Seekh Kebab',
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'Smoky Tandoori Chicken',
    url: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'Dining Area',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop'
  },
  {
    name: 'Kitchen & Tandoor',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop'
  }
];
